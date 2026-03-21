# Infrastructure as Code (AWS Stack)
# Description: Terraform configuration for the AA6 project architecture.

provider "aws" {
  region = "us-east-1"
}

# 1. S3 Bucket for Frontend Hosting
resource "aws_s3_bucket" "frontend" {
  bucket = "cloud-app-frontend-${random_string.suffix.result}"
}

# 2. CloudFront CDN
resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id   = "S3-Frontend"
  }
  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-Frontend"
    viewer_protocol_policy = "redirect-to-https" # MinTIC 2021 Requirement (TLS 1.2+)
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# 3. AWS Lambda (Business Logic)
resource "aws_lambda_function" "app_logic" {
  filename      = "function.zip"
  function_name = "CloudAppLogic"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"
}

# 4. Amazon RDS (MySQL)
resource "aws_db_instance" "database" {
  allocated_storage    = 20
  engine               = "mysql"
  instance_class       = "db.t3.micro"
  db_name              = "cloudappdb"
  username             = "admin"
  password             = "PasswordMinTIC2021!"
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true
  storage_encrypted    = true # MinTIC 2021 Requirement (AES-256)
}

# 5. Elastic Load Balancer (ELB)
resource "aws_lb" "load_balancer" {
  name               = "cloud-app-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb_sg.id]
  subnets            = [aws_subnet.public_a.id, aws_subnet.public_b.id]
}

resource "random_string" "suffix" {
  length  = 4
  special = false
}
