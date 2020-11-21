declare -a arr=(
               # "response_topic"
               # "students_getStudent"
               # "students_signup"
               # "students_login"
               # "students_updateBasicInfo"
               # "students_updateAboutMe"
               # "students_addExperience"
               # "students_removeExperience"
               # "students_updateExperience"
               # "students_updateSkills"
               # "students_addEducation"
               # "students_updateEducation"
               # "students_removeEducation"
               # "upload_ProfilePicture"
               # "upload_resume"
               # "remove_resume"
               # "students_updateJobPreferences"
               # "students_updateDemographics"
               # "contributions_addReview"
               # "contributions_removeReview",
               # "employer_signup",
               # "employer_login"
                     "employer_updateEmployerBasicInfo"
                     "employer_getEmployerById"
                     "employer_getEmployerByName"
            )
for custom_topic in "${arr[@]}"
do
 bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic $custom_topic
   
done


#bin/zookeeper-server-start.sh config/zookeeper.properties
#bin/kafka-server-start.sh config/server.properties
#bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic test
bin/kafka-topics.sh --list --zookeeper localhost:2181
