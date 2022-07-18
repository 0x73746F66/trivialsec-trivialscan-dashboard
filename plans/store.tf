resource "aws_s3_bucket" "trivialscan_store_bucket" {
  bucket = "${var.bucket_prefix}-store"
  tags = {
    CostCenter  = "randd"
    Name        = "Website"
    Environment = "Prod"
    Purpose     = "Deploy"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "trivialscan_store_lifecycle" {
  bucket = aws_s3_bucket.trivialscan_store_bucket.id

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
    noncurrent_version_transition {
      noncurrent_days = 1
      storage_class   = "STANDARD_IA"
    }
  }
}

resource "aws_s3_bucket_versioning" "trivialscan_store_versioning" {
  bucket = aws_s3_bucket.trivialscan_store_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_replication_configuration" "trivialscan_store_replication_configuration" {
  # Must have bucket versioning enabled first
  depends_on = [aws_s3_bucket_versioning.trivialscan_store_versioning]

  role   = aws_iam_role.trivialscan_store_replication_role.arn
  bucket = aws_s3_bucket.trivialscan_store_bucket.id

  rule {
    id = "trivialscan-store-archive-replication"
    status = "Enabled"
    filter {
      prefix = "scans/"
    }
    destination {
      bucket        = aws_s3_bucket.trivialscan_archive_bucket.arn
      storage_class = "ONEZONE_IA"
    }
  }
}

data "aws_iam_policy_document" "trivialscan_store_s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.bucket_prefix}-store/*"]
    principals {
      type = "AWS"
      identifiers = [
        "arn:aws:iam::${local.aws_master_account_id}:role/trivialscan-*"
      ]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = ["arn:aws:s3:::${var.bucket_prefix}-store"]

    principals {
      type = "AWS"
      identifiers = [
        "arn:aws:iam::${local.aws_master_account_id}:role/trivialscan-*"
      ]
    }
  }
}

resource "aws_s3_bucket_policy" "trivialscan_store_oai" {
  bucket = aws_s3_bucket.trivialscan_store_bucket.id
  policy = data.aws_iam_policy_document.trivialscan_store_s3_policy.json
}

resource "aws_s3_bucket_public_access_block" "trivialscan_store_resource_public_access_block" {
  bucket                  = aws_s3_bucket.trivialscan_store_bucket.id
  restrict_public_buckets = true
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
}


data "aws_iam_policy_document" "trivialscan_store_replication_policy" {
  statement {
    actions = [
      "s3:GetReplicationConfiguration",
      "s3:ListBucket"
    ]
    resources = [
      aws_s3_bucket.trivialscan_store_bucket.arn
    ]
  }

  statement {
    actions = [
      "s3:GetObjectVersionForReplication",
      "s3:GetObjectVersionAcl",
      "s3:GetObjectVersionTagging"
    ]
    resources = [
      aws_s3_bucket.trivialscan_store_bucket.arn
    ]
  }

  statement {
    actions = [
      "s3:ReplicateObject",
      "s3:ReplicateDelete",
      "s3:ReplicateTags"
    ]
    resources = [
      aws_s3_bucket.trivialscan_archive_bucket.arn
    ]
  }
}

resource "aws_iam_policy" "trivialscan_store_replication_policy" {
  name   = "trivialscan-store-archive-replication"
  policy = data.aws_iam_policy_document.trivialscan_store_replication_policy.json
}

data "aws_iam_policy_document" "assumerole_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["s3.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "trivialscan_store_replication_role" {
  name               = "tf-iam-role-replication"
  assume_role_policy = data.aws_iam_policy_document.assumerole_policy.json
}

resource "aws_iam_role_policy_attachment" "trivialscan_store_replication" {
  role       = aws_iam_role.trivialscan_store_replication_role.name
  policy_arn = aws_iam_policy.trivialscan_store_replication_policy.arn
}

output "trivialscan_store_bucket" {
  value = aws_s3_bucket.trivialscan_store_bucket.id
}
