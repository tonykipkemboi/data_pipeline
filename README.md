# AWS Data Engineering Program Project

### Movie Database
#### Determining the underlying statistics behind various aspects of the movie industry

This is project works with a public dataset containing information pulled from IMDB and TMDB about various movies. 

This dataset shows several segments relevant to the movie industry:

- Film budgets
- Film revenue
- Movie runtime
- Keywords describing the movie topics
- Movie ratings
- Number of user ratings

#### Tech Stack

`NB: I will update this portion with diagrams for better visual`

- AWS CDK
- Amazon Glue
- Amazon Athena
- Amazon S3
- AWS CLI
- QuickSight
- Python & Typescript
- Jupyter Notebooks

#### Challenges

- Dataset was a challenge to wrangle as it had lots of nested objects and tables that were either inaccurate, mislabeled, or missing data
- Joining multiple tables, when not done carefully, resulted in data duplication and uncaught leads erroneous insights.
- Had minor issues with QuickSight getting proper viz; QuickSight often wants to aggregate by count or not aggregate values for certain graph types.

