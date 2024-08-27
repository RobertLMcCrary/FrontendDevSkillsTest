const url = 'https://fedskillstest.coalitiontechnologies.workers.dev'

const username = 'coalition'
const password = 'skills-test'

const credentials = `${username}:${password}`
const encodedCredentials = btoa(credentials)

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
            console.log('Patient Data:', patient);
            console.log('All Patients:', data)
            displayPatientData(patient)
        } else {
            console.log('Jessica Taylor not found');
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayPatientData(patient) {
    
    document.getElementById('patient-name').textContent = patient.name
    document.getElementById('patient-age').textContent = patient.age

    const diagnosisList = document.getElementById('diagnosis-history');
    diagnosisList.innerHTML = ''; 
    patient.diagnosisHistory.forEach(diagnosis => {
        const listItem = document.createElement('li');
        listItem.textContent = `${diagnosis.date}: ${diagnosis.description}`;
        diagnosisList.appendChild(listItem);
    });

    const labResultsList = document.getElementById('lab-results');
    labResultsList.innerHTML = ''; 
    patient.labResults.forEach(result => {
        const listItem = document.createElement('li');
        listItem.textContent = `${result.testName}: ${result.value} ${result.unit}`;
        labResultsList.appendChild(listItem);
    });
}

fetchPatientData()