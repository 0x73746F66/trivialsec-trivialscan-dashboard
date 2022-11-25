resource "aws_s3_bucket" "trivialscan_store_bucket" {
  count = var.app_env == "Prod" ? 1 : 0
  bucket = "${var.bucket_prefix}-store"
  tags = local.tags
}

resource "aws_s3_bucket_lifecycle_configuration" "trivialscan_store_lifecycle" {
  count = var.app_env == "Prod" ? 1 : 0
  bucket = aws_s3_bucket.trivialscan_store_bucket[0].id

  rule {
    id = "dashboard_scan_retention"
    status = "Enabled"
    expiration {
      days = 365
    }
    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
    transition {
      days          = 92
      storage_class = "ONEZONE_IA"
    }
    noncurrent_version_expiration {
      noncurrent_days = 7
    }
  }
}

resource "aws_s3_bucket_versioning" "trivialscan_store_versioning" {
  count = var.app_env == "Prod" ? 1 : 0
  bucket = aws_s3_bucket.trivialscan_store_bucket[0].id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_replication_configuration" "trivialscan_store_replication_configuration" {
  count = var.app_env == "Prod" ? 1 : 0
  # Must have bucket versioning enabled first
  depends_on = [
    aws_s3_bucket_versioning.trivialscan_archive_versioning[0],
  ]

  role   = aws_iam_role.trivialscan_store_replication_role[0].arn
  bucket = aws_s3_bucket.trivialscan_store_bucket[0].id

  rule {
    id = "trivialscan-store-archive-replication"
    status = "Enabled"
    filter {
      prefix = "Prod"
    }
    delete_marker_replication {
      status = "Enabled"
    }
    destination {
      bucket        = aws_s3_bucket.trivialscan_archive_bucket[0].arn
      storage_class = "STANDARD_IA"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "trivialscan_store_resource_public_access_block" {
  count = var.app_env == "Prod" ? 1 : 0
  bucket                  = aws_s3_bucket.trivialscan_store_bucket[0].id
  restrict_public_buckets = true
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
}


data "aws_iam_policy_document" "trivialscan_store_policy" {
  count = var.app_env == "Prod" ? 1 : 0
  statement {
    actions = [
      "s3:GetReplicationConfiguration",
      "s3:ListBucket"
    ]
    resources = [
      aws_s3_bucket.trivialscan_store_bucket[0].arn
    ]
  }

  statement {
    actions = [
      "s3:GetObjectVersionForReplication",
      "s3:GetObjectVersionAcl",
      "s3:GetObjectVersionTagging"
    ]
    resources = [
      aws_s3_bucket.trivialscan_store_bucket[0].arn
    ]
  }

  statement {
    actions = [
      "s3:ReplicateObject",
      "s3:ReplicateDelete",
      "s3:ReplicateTags"
    ]
    resources = [
      aws_s3_bucket.trivialscan_archive_bucket[0].arn
    ]
  }
}

resource "aws_iam_policy" "trivialscan_store_replication_policy" {
  count = var.app_env == "Prod" ? 1 : 0
  name   = "trivialscan-store-archive-replication"
  policy = data.aws_iam_policy_document.trivialscan_store_policy[0].json
}

data "aws_iam_policy_document" "assumerole_policy" {
  count = var.app_env == "Prod" ? 1 : 0
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["s3.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "trivialscan_store_replication_role" {
  count = var.app_env == "Prod" ? 1 : 0
  name               = "tf-iam-role-replication"
  assume_role_policy = data.aws_iam_policy_document.assumerole_policy[0].json
}

resource "aws_iam_role_policy_attachment" "trivialscan_store_replication" {
  count = var.app_env == "Prod" ? 1 : 0
  role       = aws_iam_role.trivialscan_store_replication_role[0].name
  policy_arn = aws_iam_policy.trivialscan_store_replication_policy[0].arn
}
