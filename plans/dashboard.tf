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

resource "aws_cloudfront_origin_access_identity" "trivialscan_dashboard" {
  comment = aws_s3_bucket.trivialscan_dashboard.id
}

resource "aws_cloudfront_distribution" "trivialscan_dashboard" {
  depends_on = [
    aws_s3_bucket.trivialscan_dashboard
  ]
  wait_for_deployment = false
  origin {
    domain_name         = aws_s3_bucket.trivialscan_dashboard.bucket_regional_domain_name
    origin_id           = "${aws_s3_bucket.trivialscan_dashboard.id}_s3_origin"
    connection_timeout  = 2
    connection_attempts = 3

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.trivialscan_dashboard.cloudfront_access_identity_path
    }
  }
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases = ["scanner.${local.apex_domain}"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${aws_s3_bucket.trivialscan_dashboard.id}_s3_origin"
    compress         = true

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 30
    default_ttl            = 900
    max_ttl                = 3600
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "blacklist"
      locations        = ["UA", "RU", "CN", "VN", "TH", "KP", "IR", "IQ", "IN", "NG", "SO", "SS", "YE", "ZM", "ZW", "AF", "BA", "BD", "CG", "CU", "CZ", "DM", "DO", "DZ", "ET", "GT", "GU", "HN", "HT"]
    }
  }

  tags = {
    Name        = "Website"
    Environment = "Prod"
    Purpose     = "Deploy"
    CostCenter  = "randd"
  }

  viewer_certificate {
    acm_certificate_arn            = local.acm_arn
    cloudfront_default_certificate = false
    minimum_protocol_version       = "TLSv1.2_2019"
    ssl_support_method             = "sni-only"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }
}

resource "aws_route53_record" "assets_a" {
    zone_id = local.hosted_zone
    name    = "scanner.${local.apex_domain}"
    type    = "A"

    alias {
        name                   = aws_cloudfront_distribution.trivialscan_dashboard.domain_name
        zone_id                = aws_cloudfront_distribution.trivialscan_dashboard.hosted_zone_id
        evaluate_target_health = false
    }
}

resource "aws_route53_record" "assets_aaaa" {
    zone_id = local.hosted_zone
    name    = "scanner.${local.apex_domain}"
    type    = "AAAA"

    alias {
        name                   = aws_cloudfront_distribution.trivialscan_dashboard.domain_name
        zone_id                = aws_cloudfront_distribution.trivialscan_dashboard.hosted_zone_id
        evaluate_target_health = false
    }
}

resource "aws_s3_object" "dist" {
  for_each = fileset("${abspath(path.module)}/../dist", "**/*")

  bucket = aws_s3_bucket.trivialscan_dashboard.id
  key    = each.value
  source = "${abspath(path.module)}/../dist/${each.value}"
  content_type = lookup(tomap(local.mime_types), element(split(".", each.key), length(split(".", each.key)) - 1))
  etag   = filemd5("${abspath(path.module)}/../dist/${each.value}")
}

output "cloudfront_trivialscan_dashboard" {
  value = aws_cloudfront_distribution.trivialscan_dashboard.id
}

output "trivialscan_dashboard_bucket" {
  value = aws_s3_bucket.trivialscan_dashboard.id
}
