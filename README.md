# SD-1_DovkshaVictor

Before start working check that following tools are present on your environment:
- Java version "1.8" http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
- Maven https://maven.apache.org/download.cgi
- Git https://git-scm.com/downloads or https://git-for-windows.github.io/

1. Clone the repository:
 >git clone https://github.com/ncdevschool2018-2/{YOUR_REPOSITORY_NAME}.git

 For example: {YOUR_REPOSITORY_NAME} - SD-1_IvanIvanov

2. Change directory to {YOUR_REPOSITORY_NAME} directory:
 >cd {YOUR_REPOSITORY_NAME}

3. To start your/new maven module use the following command:
mvn archetype:generate -DgroupId=by.training.nc.sd1 -DartifactId=YourPrefix-Module-Name -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false

You should used correct naming for java packages: by.training.nc.{YOUR_GROUP_NAME}
For example by.training.nc.sd1

Also please read Java Package Naming:
http://www.oracle.com/technetwork/java/codeconventions-135099.html

To avoid name collision use your initial prefix for instance the prefix for Ivan Petrov is IP

4. To add you module for version tracking use the command:
  >git add YourPrefix-Module-Name

  Don't forget that only source code should be put into repository versioning

5. To commit your changes in local repository use:
  >git commit -m "initial Commit of YourPrefix-Module-Name"

6. To share your changes to remote repository:
  >git push origin master


Set up database.

1. Install MySql server https://dev.mysql.com/downloads/installer/
2. After the setup run MySQL Workbench

Helper

1. To install a JAR in the local repository use the following command:
  mvn install:install-file -Dfile=<path-to-file> -DgroupId=<group-id> \
       -DartifactId=<artifact-id> -Dversion=<version> -Dpackaging=<packaging>

Set up Tomcat 9

1. Download corresponding version of tomcat zip archive from https://tomcat.apache.org/download-90.cgi (e.g apache-tomcat-9.0.0.M18-windows-x64.zip)
2. Unzip it to <your path>/apache-tomcat-9.0.0.M18 (e.g D:\learning-program\apache-tomcat-9.0.0.M18)
3. Download and update content of start-tomcat.bat according to your variables
   In the example it is:
     >set JAVA_HOME=d:\jdk18

     >set CATALINA_HOME="D:\learning-program\apache-tomcat-9.0.0.M18"

     >set CATALINA_BASE=%CATALINA_HOME%

     >%CATALINA_HOME%\bin\catalina.bat run

4. Copy updated file to <your path>/apache-tomcat-9.0.0.M18
5. Open new cmd and execute the scenario: <your path>/apache-tomcat-9.0.0.M18>start-tomcat.bat
6. Tomcat should be run. To check if evething is ok go to browser and open the url:
    http://localhost:8080/index.jsp

Set up web application module

1. Go to {YOUR_REPOSITORY_NAME} directory
2. Open new cmd
3. Execute the following mvn command with your parameters:
  mvn archetype:generate -DgroupId=by.training.nc.sd1
         -DartifactId=YOUR-PREFIX-WebApp-Module
         -DarchetypeArtifactId=maven-archetype-webapp
         -DinteractiveMode=false


