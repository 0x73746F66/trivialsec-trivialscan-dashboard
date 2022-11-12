resource "aws_route53_record" "site_a" {
        zone_id = local.hosted_zone
    name    = "${var.app_env != "Prod" ? "dev" : "www"}.${local.apex_domain}"
    type    = "A"

    alias {
        name                   = aws_cloudfront_distribution.trivialscan_dashboard.domain_name
        zone_id                = aws_cloudfront_distribution.trivialscan_dashboard.hosted_zone_id
        evaluate_target_health = false
    }
}

resource "aws_route53_record" "site_aaaa" {
        zone_id = local.hosted_zone
    name    = "${var.app_env != "Prod" ? "dev" : "www"}.${local.apex_domain}"
    type    = "AAAA"

    alias {
        name                   = aws_cloudfront_distribution.trivialscan_dashboard.domain_name
        zone_id                = aws_cloudfront_distribution.trivialscan_dashboard.hosted_zone_id
        evaluate_target_health = false
    }
}
