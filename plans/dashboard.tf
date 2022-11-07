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

resource "aws_cloudfront_response_headers_policy" "dashboard_security_headers_policy" {
  name = "DashboardSecurityHeadersPolicy"

  cors_config {
    access_control_allow_credentials = true

    access_control_allow_headers {
      items = [
        "Authorization",
        "X-Trivialscan-Account",
        "X-Trivialscan-Version",
      ]
    }

    access_control_allow_methods {
      items = [
        "DELETE", "POST", "GET", "OPTIONS",
      ]
    }

    access_control_allow_origins {
      items = [
        "https://www.trivialsec.com"
      ]
    }

    origin_override = true
  }

  security_headers_config {
    content_type_options {
      override = true
    }
    frame_options {
      frame_option = "DENY"
      override = true
    }
    referrer_policy {
      referrer_policy = "same-origin"
      override = true
    }
    strict_transport_security {
      access_control_max_age_sec = "31536000"
      include_subdomains = true
      preload = true
      override = true
    }
    content_security_policy {
      content_security_policy = join("; ", [
        "frame-ancestors 'none'",
        "default-src 'self'",
        "img-src 'self' https://www.gravatar.com data:",
        "script-src 'self' https://www.gstatic.com https://www.google.com",
        "script-src-elem 'self' https://cdn.jsdelivr.net https://js.stripe.com",
        "font-src 'self' https://fonts.gstatic.com data:",
        "object-src 'none'",
        "form-action 'none'",
        "worker-src blob:",
        "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'",
        "style-src-attr 'sha256-pILX+5FGCpLRHvNBgtABIdSMmytrYudGxJBUYXY1t0s=' 'sha256-wK4n87cEV+DaOorOySn50J1N+etqDZQSmu9zgJp4nu4='",
        "connect-src 'self' ${local.api_domain}",
      ])
      override = true
    }
  }
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
  aliases = [
    local.apex_domain,
    "www.${local.apex_domain}"
  ]

  default_cache_behavior {
    allowed_methods  = ["HEAD", "DELETE", "POST", "GET", "OPTIONS", "PUT", "PATCH"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${aws_s3_bucket.trivialscan_dashboard.id}_s3_origin"
    compress         = true

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
    response_headers_policy_id = aws_cloudfront_response_headers_policy.dashboard_security_headers_policy.id
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

resource "aws_route53_record" "site_a" {
    zone_id = local.hosted_zone
    name    = "www.${local.apex_domain}"
    type    = "A"

    alias {
        name                   = aws_cloudfront_distribution.trivialscan_dashboard.domain_name
        zone_id                = aws_cloudfront_distribution.trivialscan_dashboard.hosted_zone_id
        evaluate_target_health = false
    }
}

resource "aws_route53_record" "site_aaaa" {
    zone_id = local.hosted_zone
    name    = "www.${local.apex_domain}"
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
