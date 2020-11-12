import React, { Component } from 'react'

import intel1 from '../../../Images/intel1.jpg'
import JobApplication from './JobApplication'

class JobDescription extends Component {

    applyForJob = ( e ) => {
        e.preventDefault()
        let popup = document.getElementById( "job-application-popup" )
        let modal = document.getElementById( "modal" )
        modal.appendChild( popup )
        popup.classList.add( "popup-wrapper-show" )
    }

    render () {
        return (
            <div className="job-description">
                <div className="compnay-image">
                    <img className="company-image" src={ intel1 } alt="company" />
                </div>
                <div className="job-description-company row">
                    <div className="company-left-pane col-8">
                        <div className="company-name-ratings">
                            {/* {job.company_name} */ }
                            Intel &nbsp;
                            <span className="job-description-ratings">
                                4.1
                            {/* {job.avg_ratings} */ }
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                                    <path fill="#0CA941" d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
                                </svg>
                            </span>
                        </div>
                        <div className="company-title">
                            {/* {job.title} */ }
                            SW DevOps Engineer
                        </div>
                        <div className="each-job-location">
                            {/* {job.location} */ }
                            Austin, TX
                        </div>
                        <div className="each-job-salary">
                            {/* {job.salary} */ }
                            $59k-$99k
                        </div>
                    </div>
                    <div className="company-right-pane col-4">
                        <button type="button" className="btn reverse-update-proflie" onClick={ this.applyForJob }>Apply Now</button>
                    </div>
                </div>
                <div className="job-description-text-wrapper">
                    <div className="job-description-heading">
                        Job Description
                    </div>
                    <div className="job-description-text">
                        {/* {job.description} */ }
                        Habana Labs, an AI company that Intel acquired, is hiring DevOps Engineers to scale up its AI infrastructure. This position collaborates with other teams to understand their orchestration, scaling and deployment requirements and collaborates with internal and external researchers to build scale-out CI/CD solutions in the open-source community. Responsibilities include maintaining and coordinating expansions of both cloud and local data-center based lab environments. You will deploy and operate our orchestration layer over both bare metal and cloud service providers, including future expansions and upgrades.
                        <br /><br />Additional Skills
                        <br />Self-starter that has an interest and desire to improve existing methods, and has a history of rapidly growing your skills through continued learning
                    </div>
                    <div className="job-description-heading">
                        Qualifications
                    </div>
                    <div className="job-description-text">
                        A BS in Computer Engineering, Computer Science, Information Systems, or a related field with 3+ years of relative work experience

                        <br /><br />2 + years of experience in Linux system administration with Bash scripting and automation tool (Ansible, Puppet, Terraform, etc) experience for cluster/cloud environment deployment/management

                        <br /><br />2+ years of experience in programming languages including Python, C, C++ or GO and their build tools and environments

                        <br /><br />1+ years of experience in at least one job scheduler such as LSF, SLURM, Mesos/Marathon, Kubernetes, Docker Swarm

                        <br /><br />Preferred Qualifications
                        <br /><br />1+ years of Experience with a Python package management system (pip, Conda) including dependency management, package specifications, versioning, and package building for both platform-independent and native binary packages

                        <br /><br />1+ years of experience in building, managing, and deploying Docker images at scale, including converting existing processes into a Docker container

                        <br /><br />1+ years of experience in CI/CD experience using Jenkins CI, GitLab CI, and others to build and maintain a fully automated: build, test, and deploy pipeline

                        <br /><br />1+ years of experience in solving issues for a Linux lab environment in areas including hardware, networking, and software

                        <br /><br />Inside this Business Group

                        <br /><br />The Data Center Group (DCG) is at the heart of Intel’s transformation from a PC company to a company that runs the cloud and billions of smart, connected computing devices. The data center is the underpinning for every data-driven service, from artificial intelligence to 5G to high-performance computing, and DCG delivers the products and technologies—spanning software, processors, storage, I/O, and networking solutions—that fuel cloud, communications, enterprise, and government data centers around the world.
                    </div>
                </div>
                <JobApplication />
            </div>
        )
    }
}

export default JobDescription;