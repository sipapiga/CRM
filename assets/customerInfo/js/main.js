document.getElementById('sendText').addEventListener('click', () => {
    let inTopic = document.getElementById('topicIn').value;
    let comment = document.getElementById('writeText').value;
    let dateCom = new Date();

    document.getElementById('topic').innerHTML = inTopic;
    document.getElementById('descriptt').innerHTML = comment;
    document.getElementById('date').innerHTML = dateCom.getFullYear() + ' - ' + dateCom.getMonth() + ' - ' + dateCom.getDate();

    document.getElementById('topicIn').value = '';
    document.getElementById('writeText').value = '';
});