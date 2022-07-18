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

output "trivialscan_archive_bucket" {
  value = aws_s3_bucket.trivialscan_archive_bucket.id
}
