declare -a arr=(
      #                "students_login"
		  # "students_signup" 
      #             "students_getStudent"
      #             "students_updateBasicInfo"
      #             "students_updateAboutMe"
      #             "students_addExperience"
      #             "students_updateExperience"
      #             "students_removeExperience"
      #             "students_updateSkills"
      #             "students_addEducation"
      #             "students_updateEducation"
      #             "students_removeEducation"
      #             "upload_ProfilePicture"
      #             "upload_resume"
      #             "remove_resume"
      # "updatePrimary_resume"
      #             "students_updateJobPreferences"
      #             "students_updateDemographics"
	    #  	  "employer_signup"
		  # "employer_login"
		  # "contributions_addReview"
		  # "contributions_removeReview"
		  # "contributions_getReview"
		  # "contributions_getReviewByEmployer"
      # "employer_getEmployerByName"
		  # "employer_getEmployerById"
		  # "employer_updateEmployerBasicInfo"
		  # "job_createJob"
		  # "job_getJobsForEmployer"
		  # "job_getAllJobs"
      
                     
            )
for custom_topic in "${arr[@]}"
do
 bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic $custom_topic
   
done


#bin/zookeeper-server-start.sh config/zookeeper.properties
#bin/kafka-server-start.sh config/server.properties
#bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic test
bin/kafka-topics.sh --list --zookeeper localhost:2181
