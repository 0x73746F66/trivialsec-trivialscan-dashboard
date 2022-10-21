resource "aws_s3_bucket" "trivialscan_archive_bucket" {
  bucket = "${var.bucket_prefix}-archive"
  tags = {
    CostCenter  = "randd"
    Name        = "Website"
    Environment = "Prod"
    Purpose     = "Deploy"
  }
}

data "aws_iam_policy_document" "trivialscan_archive_s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${aws_s3_bucket.trivialscan_archive_bucket.id}/*"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${local.aws_master_account_id}:root"]
    }
  }
  statement {
    actions   = ["s3:ListBucket"]
    resources = ["arn:aws:s3:::${aws_s3_bucket.trivialscan_archive_bucket.id}"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${local.aws_master_account_id}:root"]
    }
  }
}

resource "aws_s3_bucket_policy" "archive_resource_policy" {
  bucket = aws_s3_bucket.trivialscan_archive_bucket.id
  policy = data.aws_iam_policy_document.trivialscan_archive_s3_policy.json
}

resource "aws_s3_bucket_public_access_block" "archive_resource_public_access_block" {
  bucket                  = aws_s3_bucket.trivialscan_archive_bucket.id
  restrict_public_buckets = true
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
}

resource "aws_s3_bucket_versioning" "trivialscan_archive_versioning" {
  bucket = aws_s3_bucket.trivialscan_archive_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "trivialscan_archive_lifecycle" {
  bucket = aws_s3_bucket.trivialscan_archive_bucket.id

  rule {
    id = "archive_noncurrent_version_expiration"
    status = "Enabled"
    noncurrent_version_expiration {
      noncurrent_days = 7
    }
  }
}
