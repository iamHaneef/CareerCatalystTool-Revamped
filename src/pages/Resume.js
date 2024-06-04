import React, { useState } from 'react';
//import { generateCV } from './generateCV';

import { Fragment } from "react";
import './resume.scss'; 
import { Link } from 'react-router-dom';

function Resume(){
    const [skillDetails, setSkillDetails] = useState({
        skill: ''
    });
    const [experiences, setExperiences] = useState([{
        exp_title: '',
        exp_organization: '',
        exp_location: '',
        exp_start_date: '',
        exp_end_date: '',
        exp_description: ''
    }]);
    const [projectDetails, setProjectDetails] = useState({
        proj_title: '',
        proj_link: '',
        proj_description: ''
    });
    const [educationDetails, setEducationDetails] = useState([{
        edu_school: '',
        edu_degree: '',
        edu_city: '',
        edu_start_date: '',
        edu_graduation_date: '',
        edu_description: ''
    }]);
    
  

    const handleInputChange = (e) => {
        const { name, value } = e.target;
      
        if (validateFormData(name, value)) {
            setPersonalDetails({ ...personalDetails, [name]: value });
        }
        //const { name, value } = e.target;
        
        setProjectDetails({ ...projectDetails, [name]: value });
        setSkillDetails({ ...skillDetails, [name]: value });
        
    };

    const [successes, setSuccesses] = useState([{ title: '', description: '' }]);
    //Experience
    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const newExperiences = [...experiences];
        newExperiences[index][name] = value;
        setExperiences(newExperiences);
    };
   

    const handleAddExperience = () => {
        setExperiences([...experiences, {
            exp_title: '',
            exp_organization: '',
            exp_location: '',
            exp_start_date: '',
            exp_end_date: '',
            exp_description: ''
        }]);
    };
    const handleRemoveExperience = (index) => {
        const newExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(newExperiences);
    };
   //Education 
 
const handleInputChanges = (index, event) => {
    const { name, value } = event.target;
    const updatedEducationDetails = [...educationDetails];
    updatedEducationDetails[index][name] = value;
    setEducationDetails(updatedEducationDetails);
};

const handleAddEducation = () => {
    setEducationDetails([...educationDetails, {
        edu_school: '',
        edu_degree: '',
        edu_city: '',
        edu_start_date: '',
        edu_graduation_date: '',
        edu_description: ''
    }]);
};

const handleRemoveEducation = (index) => {
    const updatedEducationDetails = [...educationDetails];
    updatedEducationDetails.splice(index, 1);
    setEducationDetails(updatedEducationDetails);
};
  

    
    //RESUME HOLDER DETAILS
    const [personalDetails, setPersonalDetails] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        image: null,
        designation: '',
        address: '',
        email: '',
        phoneno: '',
        summary: ''
    });

    const [lists, setLists] = useState({
        achievements: [],
        experiences: [],
        educations: [],
        projects: [],
        skills: []
    });

    const validateFormData = (name, value) => {
        const strRegex = /^[a-zA-Z\s]*$/;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        switch (name) {
            case 'firstname':
            case 'middlename':
            case 'lastname':
            case 'designation':
                return strRegex.test(value) && value.trim().length > 0;
            case 'email':
                return emailRegex.test(value) && value.trim().length > 0;
            case 'phoneno':
                return phoneRegex.test(value) && value.trim().length > 0;
            case 'address':
            case 'summary':
                return value.trim().length > 0;
            default:
                return true;
        }
    };

  
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPersonalDetails({ ...personalDetails, image: URL.createObjectURL(file) });
    };

    const getFullName = () => {
        const { firstname, middlename, lastname } = personalDetails;
        return `${firstname} ${middlename} ${lastname}`.trim();
    };

    const fetchValues = (attrs, ...nodeLists) => {
        const tempDataArr = [];
        nodeLists[0].forEach((_, i) => {
            const dataObj = {};
            nodeLists.forEach((nodeList, j) => {
                dataObj[attrs[j]] = nodeList[i].value;
            });
            tempDataArr.push(dataObj);
        });
        return tempDataArr;
    };

    const getUserInputs = () => {
        const achievementsTitleElem = document.querySelectorAll('.achieve_title'),
            achievementsDescriptionElem = document.querySelectorAll('.achieve_description'),
            expTitleElem = document.querySelectorAll('.exp_title'),
            expOrganizationElem = document.querySelectorAll('.exp_organization'),
            expLocationElem = document.querySelectorAll('.exp_location'),
            expStartDateElem = document.querySelectorAll('.exp_start_date'),
            expEndDateElem = document.querySelectorAll('.exp_end_date'),
            expDescriptionElem = document.querySelectorAll('.exp_description'),
            eduSchoolElem = document.querySelectorAll('.edu_school'),
            eduDegreeElem = document.querySelectorAll('.edu_degree'),
            eduCityElem = document.querySelectorAll('.edu_city'),
            eduStartDateElem = document.querySelectorAll('.edu_start_date'),
            eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'),
            eduDescriptionElem = document.querySelectorAll('.edu_description'),
            projTitleElem = document.querySelectorAll('.proj_title'),
            projLinkElem = document.querySelectorAll('.proj_link'),
            projDescriptionElem = document.querySelectorAll('.proj_description'),
            skillElem = document.querySelectorAll('.skill');

        return {
            achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
            experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
            educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
            projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
            skills: fetchValues(['skill'], skillElem)
        };
    };
 
    //FOR SUCEESS
    
     const handleSuccessChange = (index, event) => {
        const { name, value } = event.target;
        const list = [...successes];
        list[index][name] = value;
        setSuccesses(list);
        generateCV(); // Call generateCV function to update the preview
    };

   
    const handleAddSuccess = () => {
        setSuccesses([...successes, { title: '', description: '' }]);
    };

   
    const handleRemoveSuccess = (index) => {
        const list = [...successes];
        list.splice(index, 1);
        setSuccesses(list);
        generateCV(); // Call generateCV function to update the preview
    };

    const displayCV = (userData) => {
        /*
         // Display elements for the preview section
    let educationsDsp = document.getElementById('educations_dsp');

    // Clear previous content
    educationsDsp.innerHTML = "";

    // Loop through each education in userData.educations and create HTML elements to display them
    userData.educations.forEach(education => {
        let educationElem = document.createElement('div');
        educationElem.classList.add('preview-blk');

        // Create title for the education
        let titleElem = document.createElement('div');
        titleElem.classList.add('preview-blk-title');
        titleElem.innerHTML = "<h3>Education</h3>";
        educationElem.appendChild(titleElem);

        // Create list to display details of the education
        let listElem = document.createElement('div');
        listElem.classList.add('preview-blk-list');

        // Add details of the education
        for (const key in education) {
            let itemElem = document.createElement('div');
            itemElem.classList.add('preview-item');
            let valueElem = document.createElement('span');
            valueElem.classList.add('preview-item-val');
            valueElem.textContent = education[key];
            itemElem.appendChild(valueElem);
            listElem.appendChild(itemElem);
        }

        // Append the list to the education element
        educationElem.appendChild(listElem);

        // Append the education element to the educations display container
        educationsDsp.appendChild(educationElem);
    });*/
        let achievementsDsp = document.getElementById('achievements_dsp');

        // Clear previous content
        achievementsDsp.innerHTML = "";
    
        
        userData.achievements.forEach(achievement => {
            let achievementElem = document.createElement('div');
            achievementElem.classList.add('preview-blk');
    
    
    
            // Create list to display details of the achievement
            let listElem = document.createElement('div');
            listElem.classList.add('preview-blk-list');
    
            // Add details of the achievement
            for (const key in achievement) {
                let itemElem = document.createElement('div');
                itemElem.classList.add('preview-item');
                let valueElem = document.createElement('span');
                valueElem.classList.add('preview-item-val');
                valueElem.textContent = achievement[key];
                itemElem.appendChild(valueElem);
                listElem.appendChild(itemElem);
            }
    
            // Append the list to the achievement element
            achievementElem.appendChild(listElem);
    
            // Append the achievement element to the achievements display container
            achievementsDsp.appendChild(achievementElem);
        });
        
 // Display elements for the preview section
 let experiencesDsp = document.getElementById('experiences_dsp');

 // Clear previous content
 experiencesDsp.innerHTML = "";

 // Loop through each experience in userData.experiences and create HTML elements to display them
 userData.experiences.forEach(experience => {
     let experienceElem = document.createElement('div');
     experienceElem.classList.add('preview-blk');


     // Create list to display details of the experience
     let listElem = document.createElement('div');
     listElem.classList.add('preview-blk-list');

     // Add details of the experience
     for (const key in experience) {
         let itemElem = document.createElement('div');
         itemElem.classList.add('preview-item');
         let valueElem = document.createElement('span');
         valueElem.classList.add('preview-item-val');
         valueElem.textContent = experience[key];
         itemElem.appendChild(valueElem);
         listElem.appendChild(itemElem);
     }

     // Append the list to the experience element
     experienceElem.appendChild(listElem);

     // Append the experience element to the experiences display container
     experiencesDsp.appendChild(experienceElem);
 });
};
    const generateCV=()=>{
    
        let userData = getUserInputs();
        displayCV(userData); // Call displayCV function here
        console.log(userData);
    
       
    }
    return(
        <Fragment>
<div className="jarvis">      
        <nav className = "navbar bg-white">
            <div className="container">
                <div className = "navbar-content">
                    <div className = "brand-and-toggler">
                    <Link to="/" className="navbar-brand" />
                            <img src = "https://cdn4.iconfinder.com/data/icons/staff-management-vol-1/72/34-512.png" alt = "" className = "navbar-brand-icon"/>
                            <span className = "navbar-brand-text">See We Crafter</span>
                        
                        <div className="spinner" id="daa"></div>
                        <h6 className = "text-uppercase "> build a resume</h6>
                    </div>
                </div>
            </div>
        </nav>

        <section id = "about-sc" className = "">
            <div className = "container">
                <div className = "about-cnt">
                    <form action="" className="cv-form" id = "cv-form">
                        <div className = "cv-form-blk">
                            <div className = "cv-form-row-title">
                            <h3>Resume Holder Personal Details</h3>
                </div>
                <div className="cv-form-row cv-form-row-about">
                    <div className="cols-3">
                        <div className="form-elem">
                            <label className="form-label">First Name</label>
                            <input
                                name="firstname"
                                type="text"
                                className="form-control firstname"
                                placeholder="e.g. Mahendra"
                                value={personalDetails.firstname}
                                onChange={handleInputChange}
                            />
                            <span className="form-text"></span>
                        </div>
                        <div className="form-elem">
                            <label className="form-label">Middle Name <span className="opt-text">(* optional)</span></label>
                            <input
                                name="middlename"
                                type="text"
                                className="form-control middlename"
                                placeholder="e.g. Singh"
                                value={personalDetails.middlename}
                                onChange={handleInputChange}
                            />
                            <span className="form-text"></span>
                        </div>
                        <div className="form-elem">
                            <label className="form-label">Last Name</label>
                            <input
                                name="lastname"
                                type="text"
                                className="form-control lastname"
                                placeholder="e.g. Dhoni"
                                value={personalDetails.lastname}
                                onChange={handleInputChange}
                            />
                            <span className="form-text"></span>
                        </div>
                    </div>

                    <div className="cols-3">
                        <div className="form-elem">
                            <label className="form-label">Your Profile Image</label>
                            <input
                                name="image"
                                type="file"
                                className="form-control image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="form-elem">
                            <label className="form-label">Designation</label>
                            <input
                                name="designation"
                                type="text"
                                className="form-control designation"
                                placeholder="e.g. Sr.Engineer"
                                value={personalDetails.designation}
                                onChange={handleInputChange}
                            />
                            <span className="form-text"></span>
                        </div>
                        <div className="form-elem">
                            <label className="form-label">Address</label>
                            <input
                                name="address"
                                type="text"
                                className="form-control address"
                                placeholder="e.g. North-Street 23"
                                value={personalDetails.address}
                                onChange={handleInputChange}
                            />
                            <span className="form-text"></span>
                        </div>
                    </div>

                    <div className="cols-3">
                        <div className="form-elem">
                            <label className="form-label">Email ID</label>
                            <input
                                name="email"
                                type="text"
                                className="form-control email"
                                placeholder="e.g. mahiicric@gmail.com"
                                value={personalDetails.email}
                                onChange={handleInputChange}
                            />
                            <span className="form-text"></span>
                        </div>
                        <div className="form-elem">
                            <label className="form-label">Phone No:</label>
                            <input
                                name="phoneno"
                                type="text"
                                className="form-control phoneno"
                                placeholder="e.g. 733-9445-186"
                                value={personalDetails.phoneno}
                                onChange={handleInputChange}
                            />
                            <span className="form-text"></span>
                        </div>
                        <div className="form-elem">
                        <label className="form-label">Summary</label>
                        <textarea
                            name="summary"
                            className="form-control summary"
                            placeholder="e.g. A detail-oriented engineer with 5 years of experience..."
                            value={personalDetails.summary}
                            onChange={handleInputChange}
                            ></textarea>
                            <span className="form-text"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="cv-form-blk">
                            <div className = "cv-form-row-title">
                                <h3>Successes</h3>
                            </div>

                            <div className="row-separator repeater">
                {successes.map((success, index) => (
                    <div className="repeater" data-repeater-list="group-a" key={index}>
                        <div data-repeater-item>
                            <div className="cv-form-row cv-form-row-achievement">
                                <div className="cols-2">
                                    <div className="form-elem">
                                        <label htmlFor="" className="form-label">Label about</label>
                                        <input
                                            name="title"
                                            type="text"
                                            className="form-control achieve_title"
                                            value={success.title}
                                            onChange={(e) => handleSuccessChange(index, e)}
                                            placeholder="e.g. Achievement Title"
                                        />
                                        <span className="form-text"></span>
                                    </div>
                                    <div className="form-elem">
                                        <label htmlFor="" className="form-label">Summary / Description</label>
                                        <input
                                            name="description"
                                            type="text"
                                            className="form-control achieve_description"
                                            value={success.description}
                                            onChange={(e) => handleSuccessChange(index, e)}
                                            placeholder="e.g. Achievement Description"
                                        />
                                        <span className="form-text"></span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    data-repeater-delete
                                    className="repeater-remove-btn"
                                    onClick={() => handleRemoveSuccess(index)}
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    data-repeater-create
                    value="Add"
                    className="repeater-add-btn"
                    onClick={handleAddSuccess}
                >
                    +
                </button>
                            </div>
                        </div>

                        <div className="cv-form-blk">
            <div className="cv-form-row-title" >
                <h3>Expertise / Experience</h3>
            </div>

            <div className="row-separator repeater">
                    {experiences.map((experience, index) => (
                        <div className="repeater" data-repeater-list="group-b" key={index}>
                            <div data-repeater-item>
                                <div className="cv-form-row cv-form-row-experience">
                                    <div className="cols-3">
                                        <div className="form-elem">
                                            <label htmlFor="" className="form-label">About</label>
                                            <input
                                                name="exp_title"
                                                type="text"
                                                className="form-control exp_title"
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                placeholder="Title"
                                                value={experience.exp_title}
                                            />
                                            <span className="form-text"></span>
                                        </div>
                                        <div className="form-elem">
                                            <label htmlFor="" className="form-label">Workplace</label>
                                            <input
                                                name="exp_organization"
                                                type="text"
                                                className="form-control exp_organization"
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                placeholder="Organization"
                                                value={experience.exp_organization}
                                            />
                                            <span className="form-text"></span>
                                        </div>
                                        <div className="form-elem">
                                            <label htmlFor="" className="form-label">Address</label>
                                            <input
                                                name="exp_location"
                                                type="text"
                                                className="form-control exp_location"
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                placeholder="Location"
                                                value={experience.exp_location}
                                            />
                                            <span className="form-text"></span>
                                        </div>
                                    </div>

                                    <div className="cols-3">
                                        <div className="form-elem">
                                            <label htmlFor="" className="form-label">Join Date</label>
                                            <input
                                                name="exp_start_date"
                                                type="date"
                                                className="form-control exp_start_date"
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                value={experience.exp_start_date}
                                            />
                                            <span className="form-text"></span>
                                        </div>
                                        <div className="form-elem">
                                            <label htmlFor="" className="form-label">Finish Date</label>
                                            <input
                                                name="exp_end_date"
                                                type="date"
                                                className="form-control exp_end_date"
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                value={experience.exp_end_date}
                                            />
                                            <span className="form-text"></span>
                                        </div>
                                        <div className="form-elem">
                                            <label htmlFor="" className="form-label">Description</label>
                                            <input
                                                name="exp_description"
                                                type="text"
                                                className="form-control exp_description"
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                placeholder="Description"
                                                value={experience.exp_description}
                                            />
                                            <span className="form-text"></span>
                                        </div>
                                    </div>

                                    <button
                                        data-repeater-delete
                                        type="button"
                                        className="repeater-remove-btn"
                                        onClick={() => handleRemoveExperience(index)}
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        data-repeater-create
                        value="Add"
                        className="repeater-add-btn"
                        onClick={handleAddExperience}
                    >
                        +
                    </button>
            </div>
                        </div>

                        <div className="cv-form-blk">
                            <div className = "cv-form-row-title">
                                <h3>Education</h3>
                            </div>

                            <div className="row-separator repeater">
                {educationDetails.map((education, index) => (
                    <div className="repeater" data-repeater-list="group-c" key={index}>
                        <div data-repeater-item>
                            <div className="cv-form-row cv-form-row-experience">
                                <div className="cols-3">
                                    <div className="form-elem">
                                        <label htmlFor="" className="form-label">School</label>
                                        <input
                                            name="edu_school"
                                            type="text"
                                            className="form-control edu_school"
                                            placeholder="e.g. National Academy Hr Sec School"
                                            value={education.edu_school}
                                            onChange={(e) => handleInputChanges(index, e)}
                                        />
                                        <span className="form-text"></span>
                                    </div>
                                    <div className="form-elem">
                                        <label htmlFor="" className="form-label">Qualification</label>
                                        <input
                                            name="edu_degree"
                                            type="text"
                                            className="form-control edu_degree"
                                            placeholder="e.g. BE CSE"
                                            value={education.edu_degree}
                                            onChange={(e) => handleInputChanges(index, e)}
                                        />
                                        <span className="form-text"></span>
                                    </div>
                                    <div className="form-elem">
                                        <label htmlFor="" className="form-label">City</label>
                                        <input
                                            name="edu_city"
                                            type="text"
                                            className="form-control edu_city"
                                            placeholder="e.g. Chennai"
                                            value={education.edu_city}
                                            onChange={(e) => handleInputChanges(index, e)}
                                        />
                                        <span className="form-text"></span>
                                    </div>
                                </div>
                                <div className="cols-3">
                                    <div className="form-elem">
                                        <label htmlFor="" className="form-label">Join Date</label>
                                        <input
                                            name="edu_start_date"
                                            type="date"
                                            className="form-control edu_start_date"
                                            value={education.edu_start_date}
                                            onChange={(e) => handleInputChanges(index, e)}
                                        />
                                        <span className="form-text"></span>
                                    </div>
                                    <div className="form-elem">
                                        <label htmlFor="" className="form-label">Finish Date</label>
                                        <input
                                            name="edu_graduation_date"
                                            type="date"
                                            className="form-control edu_graduation_date"
                                            value={education.edu_graduation_date}
                                            onChange={(e) => handleInputChanges(index, e)}
                                        />
                                        <span className="form-text"></span>
                                    </div>
                                    <div className="form-elem">
                                        <label htmlFor="" className="form-label">Summary</label>
                                        <input
                                            name="edu_description"
                                            type="text"
                                            className="form-control edu_description"
                                            placeholder="Summary"
                                            value={education.edu_description}
                                            onChange={(e) => handleInputChanges(index, e)}
                                        />
                                        <span className="form-text"></span>
                                    </div>
                                </div>
                                <button data-repeater-delete type="button" className="repeater-remove-btn" onClick={() => handleRemoveEducation(index)}>-</button>
                            </div>
                        </div>
                    </div>
                ))}
                <button type="button" data-repeater-create value="Add" className="repeater-add-btn" onClick={handleAddEducation}>+</button>
                            </div>
                        </div>

                        <div className="cv-form-blk">
                            <div className = "cv-form-row-title">
                                <h3>Venture / Projects</h3>
                            </div>

                            <div className = "row-separator repeater">
                                <div className = "repeater" data-repeater-list = "group-d">
                                    <div data-repeater-item>
                                        <div className = "cv-form-row cv-form-row-experience">
                                            <div className = "cols-3">
                                                <div className = "form-elem">
                                                    <label for = "" className = "form-label">Endeavor Name</label>
                                                    <input
                            name="proj_title"
                            type="text"
                            className="form-control proj_title"
                            placeholder="e.g. Chat-Cafe"
                            value={projectDetails.proj_title}
                            onChange={handleInputChange}
                        />
                                                    <span className="form-text"></span>
                                                </div>
                                                <div className = "form-elem">
                                                    <label for = "" className = "form-label">Endeavor link</label>
                                                    <input
                            name="proj_link"
                            type="text"
                            className="form-control proj_link"
                            placeholder="e.g. www.chatcafe.com"
                            value={projectDetails.proj_link}
                            onChange={handleInputChange}
                        />
                                                    <span className="form-text"></span>
                                                </div>
                                                <div className = "form-elem">
                                                    <label for = "" className = "form-label">Summary </label>
                                                    <input
                            name="proj_description"
                            type="text"
                            className="form-control proj_description"
                            placeholder="Summary"
                            value={projectDetails.proj_description}
                            onChange={handleInputChange}
                        />
                                                    <span className="form-text"></span>
                                                </div>
                                            </div>
                                            <button data-repeater-delete type = "button" className = "repeater-remove-btn">-</button>
                                        </div>
                                    </div>
                                </div>
                                <button type = "button" data-repeater-create value = "Add" className = "repeater-add-btn">+</button>
                            </div>
                        </div>

                        <div className="cv-form-blk">
                            <div className = "cv-form-row-title">
                                <h3>Proficiencies</h3>
                            </div>

                            <div className = "row-separator repeater">
                                <div className = "repeater" data-repeater-list = "group-e">
                                    <div data-repeater-item>
                                        <div className = "cv-form-row cv-form-row-skills">
                                            <div className = "form-elem">
                                                <label for = "" className = "form-label">Which Skill are you expertise in</label>
                                                <input
                                    name="skill"
                                    type="text"
                                    className="form-control skill"
                                    placeholder="e.g. Web-Technology"
                                    value={skillDetails.skill}
                                    onChange={handleInputChange}
                                />
                                                <span className="form-text"></span>
                                            </div>
                                            
                                            <button data-repeater-delete type = "button" className = "repeater-remove-btn">-</button>
                                        </div>
                                    </div>
                                </div>
                                <button type = "button" data-repeater-create value = "Add" className = "repeater-add-btn">+    </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    <div className="finish" style={{ backgroundColor: 'rgb(246, 242, 239)',  padding: '11px'}}>
        <section id = "preview-sc" className = "print_area">
            <div className = "container">
                <div className = "preview-cnt">
                    <div className = "preview-cnt-l bg-green text-white">
                        <div className = "preview-blk">
                        <div className="preview-image">
                                    {personalDetails.image && <img src={personalDetails.image} alt="Profile" />}
                                </div>
                                <div className="preview-item preview-item-name">
                                    <span className="preview-item-val fw-6">{getFullName()}</span>
                                </div>
                                <div className="preview-item">
                                    <span  className="preview-item-val text-uppercase fw-6 ls-1" id="design">{personalDetails.designation}</span>
                                </div >
                            </div>

                        <div className = "preview-blk" id='about'>
                            <div className = "preview-blk-title">
                                <h3 >about</h3>
                            </div>
                            <div className="preview-blk-list">
                                    <div className="preview-item">
                                        <span className="preview-item-val">{personalDetails.phoneno}</span>
                                    </div>
                                    <div className="preview-item">
                                        <span className="preview-item-val">{personalDetails.email}</span>
                                    </div>
                                    <div className="preview-item">
                                        <span className="preview-item-val">{personalDetails.address}</span>
                                    </div>
                                    <div className="preview-item">
                                        <span className="preview-item-val">{personalDetails.summary}</span>
                                    </div>
                            </div>
                        </div>

                        <div className = "preview-blk" id='skill' >
                            <div className = "preview-blk-title">
                                <h3 >skills</h3>
                            </div>
                            
                            <div className = "skills-items preview-blk-list" id = "skills_dsp">
                            <p className='pop'><strong>{skillDetails.skill}</strong> </p> 
                            </div>
                        </div>
                    </div>

                    <div className = "preview-cnt-r " style={{ backgroundColor: 'rgb(150, 162, 192)'}}>
                        <div className = "preview-blk">
                            <div className = "preview-blk-title">
                                <h3>Achievements</h3>
                            </div>
                            <div className = "achievements-items preview-blk-list" id = "achievements_dsp"></div>
                        </div>

                        <div className="preview-blk">
    <div className="preview-blk-title">
        <h3>Educations</h3>
        <h3></h3>
    </div>
    <div className="educations-items preview-blk-list" id="educations_dsp">
        {educationDetails.map((education, index) => (
            <div key={index}>
                <p><strong>School:</strong> {education.edu_school}</p>
                <p><strong>Qualification:</strong> {education.edu_degree}</p>
                <p><strong>City:</strong> {education.edu_city}</p>
                <p><strong>Join Date:</strong> {education.edu_start_date}</p>
                <p><strong>Finish Date:</strong> {education.edu_graduation_date}</p>
                <p><strong>Summary:</strong> {education.edu_description}</p>
            </div>
        ))}
    </div>
</div>

<div className="preview-blk">
    <div className="preview-blk-title">
        <h3>Experience</h3>
    </div>
    <div className="experiences-items preview-blk-list" id="experiences_dsp">
        {experiences.map((experience, index) => (
            <div key={index}>
                <p><strong>Title:</strong> {experience.exp_title}</p>
                <p><strong>Workplace:</strong> {experience.exp_organization}</p>
                <p><strong>Location:</strong> {experience.exp_location}</p>
                <p><strong>Join Date:</strong> {experience.exp_start_date}</p>
                <p><strong>Finish Date:</strong> {experience.exp_end_date}</p>
                <p><strong>Description:</strong> {experience.exp_description}</p>
            </div>
        ))}
    </div>
</div>


                        <div className = "preview-blk">
                            <div className = "preview-blk-title">
                                <h3>projects</h3>
                            </div>
                            
                            <div className = "projects-items preview-blk-list" id = "projects_dsp">
                            <p><strong>{projectDetails.proj_title}</strong> </p>
                <p><strong>{projectDetails.proj_link}</strong> </p>
                <p><strong>{projectDetails.proj_description}</strong> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className = "print-btn-sc">
            <div className = "container">
                <button type = "button" className = "print-btn btn btn-primary" onclick="printCV()">Print CV</button>
            </div>
        </section>

        </div>  
</div>  
        </Fragment>
    )
}


export default Resume;