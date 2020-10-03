# Data Journalism and D3
## Deployment Link
https://jiuhe2020.github.io/D3-challenge/

## Challenge Instructions
This project utilizes D3 techniques to analyze the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers understand the findings. The data set is based on 2014 ACS 1-year estimates, including data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

## D3 Dabbler
A scatter plot was created between two of the data variables such as Healthcare vs. Poverty, which represents each state with circle elements.
- The data was imported from data.csv by using the d3.csv function
- Each circle included state abbreviations
- Axes and labels were created and situated to the left and bottom of the chart
![Healthcare vs Poverty](https://github.com/Jiuhe2020/D3-challenge/blob/master/images/Healthcare_vs_Poverty.png)

## BONUS: Incorporate d3-tip
Why make a static graphic when D3 lets you interact with your data?
- Additional labels were plotted in the scatter plot and click events were associated with them, so that the users can decide which data to display
- The transitions were animated for the circles' locations as well as the range of the axes
- Tooltips were added to the circles and each tooltip can be displayed with the data that the user has selected

---
### Copyright
Jiuhe Zhu © 2020. All Rights Reserved.
