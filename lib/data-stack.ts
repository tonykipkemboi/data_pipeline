import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as glue from '@aws-cdk/aws-glue-alpha';
import * as athena from 'aws-cdk-lib/aws-athena';
import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';

export class DataStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Creates an S3 bucket for raw data
    const raw_data_bucket = new s3.Bucket(this, 'RawDataBucket', {
      versioned: true,
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // Uploads a local data file into the bucket
    const deployer = new s3deploy.BucketDeployment(this, 'DeployDataFile', {
      sources: [s3deploy.Source.asset('./_data2')],
      destinationBucket: raw_data_bucket,
      destinationKeyPrefix: 'rawdata/custorders',
      retainOnDelete: false
    });

    // Creates a Glue database
    const glue_db = new glue.Database(this, 'myDatabase', {
      databaseName: 'project_database',
    });

    // Create crawler role
    const crawlerRole = new cdk.aws_iam.Role(this, 'CrawlerRole', {
      assumedBy: new cdk.aws_iam.ServicePrincipal('glue.amazonaws.com'),
    });

    crawlerRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'));

    raw_data_bucket.grantRead(crawlerRole);

    // Create Glue Table using crawler
    const cfnCrawler = new cdk.aws_glue.CfnCrawler(this, 'MyCfnCrawler', {
      role: crawlerRole.roleName,
      targets: {
        s3Targets: [{
          path: `s3://${raw_data_bucket.bucketName}/links_small/`
        }],
      },
      databaseName: glue_db.databaseName,
      name: 'crawled',
      schedule: {
        scheduleExpression: "Cron(35 10 * * ? *)"
      },
      schemaChangePolicy: {
        deleteBehavior: 'DELETE_FROM_DATABASE',
        updateBehavior: 'UPDATE_IN_DATABASE',
      }
    });

    // Creates a named query in Athena
    const athena_query = new athena.CfnNamedQuery(this, 'myAthenaQuery', {
      database: 'database',
      queryString: 'queryString'
    });
  }
}
