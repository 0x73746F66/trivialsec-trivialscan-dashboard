locals {
  aws_master_account_id = 984310022655
  aws_default_region    = "ap-southeast-2"
  apex_domain           = "trivialsec.com"
  acm_arn               = "arn:aws:acm:us-east-1:${local.aws_master_account_id}:certificate/8ba67bad-47e9-4936-a860-d47ae4bafba6" #this needs to be us-east-1, do not change
}
