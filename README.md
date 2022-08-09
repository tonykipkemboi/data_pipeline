# AWS Data Engineering Program Project

### Movie Database
#### Determining the underlying statistics behind various aspects of the movie industry

This is project works with a public dataset containing information pulled from IMDB and TMDB about various movies. 

This dataset shows several segments relevant to the movie industry:

<li>Film budgets</li>
<li>Film revenue</li>
<li>Movie runtime</li>
<li>Keywords describing the movie topics</li>
<li>Movie ratings</li>
<li>Number of user ratings</li>

#### Tech Stack

`NB: I will update this portion with diagrams for better visual`

<li>AWS CDK</li>
<li>Amazon Glue</li>
<li>Amazon Athena</li>
<li>Amazon S3</li>
<li>AWS CLI</li>
<li>QuickSight</li>
<li>Python & Typescript</li>
<li>Jupyter Notebooks</li>

#### Challenges

- Dataset was a challenge to wrangle as it had lots of nested objects and tables that were either inaccurate, mislabeled, or missing data
- Joining multiple tables, when not done carefully, resulted in data duplication and uncaught leads erroneous insights.
- Had minor issues with QuickSight getting proper viz; QuickSight often wants to aggregate by count or not aggregate values for certain graph types.

