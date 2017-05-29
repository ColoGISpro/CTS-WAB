Release versions are maintained in application title so zip file download are uniquely name using the following format: [title] v.[major][minorXX] 

Edits between releases are tracked in app descriptions using the following format. v[major].[minor].[WAB app number].[incrementing build].

Rules for incrementing versions:
[Major] = when app functionality changes significantly or underlying data changes in a way that makes backward compatibility unfeasible.
[minor] = represent a release. A release it triggered when code is "downloaded" and deployed to web server
[WAB app number] = Web App Builder auto creates this ID and saves app in WebAppBuilderForArcGIS\server\apps\X
[build] = new version to track internal commits on Github
