# APP
The SampleDataset contains 200 data points spread across three columns: x, y, and category. 
Here's a breakdown of each column:
x and y: Positive integer values, representing some measure or dimension.
category: Categorical column with three possible values: 'A', 'B', or 'C'. 
These labels are randomly assigned to each data point.
Develop a dashboard that replicates the application demonstrated in the following cell. 
The dashboard should consist of three main components: App, Child 1, and Child 2. 
Within the App component, load the specified CSV file to establish the overall layout of the dashboard, then distribute the data to both Child 1 and Child 2 components for further processing and display. 
Detailed descriptions of the child components are provided in the subsequent cells.
Important: Please refrain from using the enter-append technique. Instead, opt for the join technique.


## Child 1 (40 points)
Create a bar chart in your Child1 component to visually represent the count of items across different categories. 
The height of each bar should correspond to the number of items in its respective category. 
Additionally, label each bar with the counts as shown in the screenshot below: 65, 59, and 76.  


## Child 2 (60 points)
Create a scatterplot in your Child2 component to illustrate the correlation between x and y values across different categories. 
Initially, set category A as the default for the scatterplot. 
Include a dropdown menu with hardcoded category options to allow users to switch between different categories, which will dynamically update the scatterplot. 
Integrate tooltips into the scatterplot that display the x and y values of the data points when the user hovers over them.