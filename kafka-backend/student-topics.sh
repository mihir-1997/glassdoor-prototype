declare -a arr=(
                #  "students_signup" 
                #  "students_login" 
                #  "students_getStudent"
                 "students_updateBasicInfo"
                 "student_updateAboutMe"
                     
            )
for custom_topic in "${arr[@]}"
do
 echo $custom_topic
 bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic $custom_topic
   
done


#bin/zookeeper-server-start.sh config/zookeeper.properties
#bin/kafka-server-start.sh config/server.properties
#bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic test
bin/kafka-topics.sh --list --zookeeper localhost:2181
