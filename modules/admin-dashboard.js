const fetchUsers = async()=>{
    try {
  const res = await fetch('http://localhost:5503/users')
    .then(response => response.json())

  return res;
  } catch (error) {
    console.log('Error fetching users:', error);
    return [];
  }
}

const fetchFeedbacks = async()=>{
    try {
  const res = await fetch('http://localhost:5503/feedback')
    .then(response => response.json())

  return res;
  } catch (error) {
    console.log('Error fetching feedbacks:', error);
    return [];
  }
}

const generateStats = async() => {
    let users = await fetchUsers();
    let students = users.filter(user=>user.role==="student");
    
    let feedbacks = await fetchFeedbacks();

    return {
        students:students.length,
        feedbacks:feedbacks.length
    }
}

const displayLatestFeedback = async() => {
    let feedbacks = await fetchFeedbacks();
    let latestFeedbackContent = document.getElementById("feedback-content");
    latestFeedbackContent.innerHTML = "";

    for(let i=feedbacks.length-1;i>feedbacks.length-4;i--){
        latestFeedbackContent.innerHTML+= `<li class="list-group-item">Feedback #${feedbacks[i].id} - “${feedbacks[i].subject}”</li>`
    }
}

const displayStats = async() => {
    const stats = await generateStats();
    document.getElementById('student-stats').innerText = stats?.students || 0;
    document.getElementById('feedback-stats').innerText = stats?.feedbacks || 0;
    document.getElementById('queries-stats').innerText = stats?.queries || 0;
}

document.addEventListener("DOMContentLoaded",async()=>{
    await displayStats();
    await displayLatestFeedback()
})