declare -a arr=(
                  "students_login"
		              "students_signup" 
                  "students_getStudent"
                  "students_updateBasicInfo"
                  "students_updateAboutMe"
                  "students_addExperience"
                  "students_updateExperience"
                  "students_removeExperience"
                  "students_updateSkills"
                  "students_addEducation"
                  "students_updateEducation"
                  "students_removeEducation"
                  "upload_ProfilePicture"
                  "upload_resume"
                  "remove_resume"
                  "updatePrimary_resume"
                  "students_updateJobPreferences"
                  "students_updateDemographics"
	     	         "employer_signup"
		  "employer_login"
      "contributions_addPhotos"
		  "contributions_addReview"
		  "contributions_removeReview"
		  "contributions_getReview"
		  "contributions_getReviewByEmployer"
              "contributions_replyToReview"
              "contributions_updateReviewStatus"
              "contributions_markReviewAsFeatured"
            "contributions_addInterview"
            "contributions_getInterviewsByEmployer"
            "contributions_getInterviewsByStudent"
            "contributions_updatePhotoStatus"
            "contributions_getSalariesByStudent"
            "contributions_getPhotosByStudent"
            "contributions_getPhotosByEmployer"
              "contributions_markReviewAsFavourite"
      "contributions_helpfulReview"
      "contributions_getSalariesByEmployer"
      "contributions_addSalary"
      "employer_getAllEmployers"
      "employer_updateEmployerProfilePicture"
      "upload_officePhotos"
      "employer_getEmployerByName"
		  "employer_getEmployerById"
		  "employer_updateEmployerBasicInfo"
		  "job_createJob"
		  "job_getJobsForEmployer"
		  "job_getAllJobs"
              "job_getJobsBasedOnTitle"
              "job_applyForJob"
              "analytics_reviewsperday"
      
                     
            )
for custom_topic in "${arr[@]}"
do
 bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic $custom_topic
   
done


#bin/zookeeper-server-start.sh config/zookeeper.properties
#bin/kafka-server-start.sh config/server.properties
#bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic test
#bin/kafka-topics.sh --list --zookeeper localhost:2181
