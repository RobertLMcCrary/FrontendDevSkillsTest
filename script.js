const url = 'https://fedskillstest.coalitiontechnologies.workers.dev'

const username = 'coalition'
const password = 'skills-test'

const credentials = `${username}:${password}`
const encodedCredentials = btoa(credentials)

//fetch the data from the API
async function fetchPatientData() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${encodedCredentials}`
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        const patient = data.find(patient => patient.name === 'Jessica Taylor')

        if (patient) {
            console.log('Patient Data:', patient)
            console.log('All Patients:', data)
            displayPatientData(patient)
            fillPatientList(data)
            showDiagnosticList(patient)
        } else {
            console.log('Jessica Taylor not found')
        }
    }
    catch (error) {
        console.error('Error fetching data:', error)
    }
}

//adding the data into the HTML
function displayPatientData(patient) {
    document.getElementById('patient-name').textContent = patient.name
    document.getElementById('patient-profile-dob').textContent = patient.date_of_birth
    document.getElementById('patient-profile-gender').textContent = patient.gender
    document.getElementById('patient-profile-contact').textContent = patient.phone_number
    document.getElementById('patient-profile-emergency-contact').textContent = patient.emergency_contact
    document.getElementById('patient-profile-insurance').textContent = patient.insurance_type

    const labResults = document.querySelector('.lab-results')
    labResults.innerHTML = '<h1>Lab Results</h1>';

    patient.lab_results.forEach(result => {
        const listItem = document.createElement('p')
        listItem.textContent = result
        labResults.appendChild(listItem)
    });
}

function showDiagnosticList(patient) {
    const diagnosticList = document.querySelector('.diagnostic-list')
    diagnosticList.innerHTML = `
        <h1>Diagnostic List</h1>
        <div class="top-card">
            <strong>Problem/Diagnosis</strong>
            <strong>Description</strong>
            <strong>Status</strong>
        </div>
    `

    console.log(patient.diagnostic_list)

    patient.diagnostic_list.forEach(result => {
        const listItem = document.createElement('div')
        listItem.classList.add('diagnostic-history-card')

        const diagnosticName = document.createElement('p')
        diagnosticName.textContent = result.name
        listItem.appendChild(diagnosticName)

        const diagnosticDescription = document.createElement('p')
        diagnosticDescription.textContent = result.description
        listItem.appendChild(diagnosticDescription)

        const diagnosticStatus = document.createElement('p')
        diagnosticStatus.textContent = result.status
        listItem.appendChild(diagnosticStatus)

        diagnosticList.appendChild(listItem)
    })
}

//filling the sidebar patient list
function fillPatientList(patients) {
    const patientList = document.getElementById('patient-list')
    patientList.innerHTML = '';

    patients.forEach(patient => {
        const card = document.createElement('li')
        card.classList.add('patient-card')

        const cardData = document.createElement('div')
        cardData.classList.add('patient-card-data')

        const cardName = document.createElement('h3')
        cardName.classList.add('patient-card-name')
        cardName.textContent = patient.name

        const patientInfo = document.createElement('p')
        patientInfo.classList.add('patient-list-data')
        patientInfo.id = 'patient-list-data';
        patientInfo.textContent = `Gender: ${patient.gender}, Age: ${patient.age}`;

        cardData.appendChild(cardName)
        cardData.appendChild(patientInfo)
        card.appendChild(cardData)

        patientList.appendChild(card)
    })
}



fetchPatientData()