<template>
  <div>
    <h1>{{tutor.firstName}} {{tutor.lastName}}</h1>
    <h3>Rate: ${{tutor.rate}}</h3>
    <h3>Phone: <a :href= "'sms:' + tutor.phone"> {{tutor.phone}}</a></h3>
    <h3>Email:<a :href= "'mailto:' + tutor.email"> {{tutor.email}}</a></h3>
    <h3>Grade: {{tutor.grade}}</h3>
    <h4>Subjects: {{subjectList}}</h4>
    <h4>Levels: {{levelsList}}</h4>
    <h3>Town: {{tutor.town}}</h3>
    <p><b>Experience:</b> {{tutor.experience}}</p>
    <p><b>Bio:</b> {{tutor.bio}}</p>
  </div>
</template>

<script>
export default {
  props: ["tutor"],
  name: "Tutor",
  computed: {
    subjectList() {
      return creatListString(this.tutor.subjects);
    },
    levelsList() {
      return creatListString(this.tutor.levels);
    }
  }
};

function creatListString(list) {
  var listString = "";

  for (var i = 0; i < list.length; i++) {
    if (i == list.length - 1 && list.length > 1) {
      listString += "and ";
    }
    listString += list[i].S;
    if (i < list.length - 1) {
      if (list.length > 2) {
        listString += ", ";
      } else {
        listString += " ";
      }
    }
  }
  return listString;
}
</script>

