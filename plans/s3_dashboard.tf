resource "aws_s3_bucket" "trivialscan_dashboard" {
  bucket         = "${var.bucket_prefix}-site"
  tags = {
    CostCenter  = "randd"
    Name        = "Website"
    Environment = "Prod"
    Purpose     = "Deploy"
  }
}

data "aws_iam_policy_document" "trivialscan_site_s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${aws_s3_bucket.trivialscan_dashboard.id}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.trivialscan_dashboard.iam_arn]
    }
  }
  statement {
    actions   = ["s3:ListBucket"]
    resources = ["arn:aws:s3:::${aws_s3_bucket.trivialscan_dashboard.id}"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.trivialscan_dashboard.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "trivialscan_site_oai" {
  bucket = aws_s3_bucket.trivialscan_dashboard.id
  policy = data.aws_iam_policy_document.trivialscan_site_s3_policy.json
}

resource "aws_s3_bucket_public_access_block" "trivialscan_site_resource_public_access_block" {
  bucket                  = aws_s3_bucket.trivialscan_dashboard.id
  restrict_public_buckets = true
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
}
