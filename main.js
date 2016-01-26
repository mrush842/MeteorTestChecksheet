
ClassList = new Mongo.Collection('class');

if(Meteor.isClient){

  Template.checksheet.helpers({
    'class': function(){
      return ClassList.find({}, {sort: {classNumber: 1} }) // sorts ascending order
    }, // return each person in ClassList, give identity of class

    'selectedClass': function(){
      var classId = this._id;
      var selectedClass = Session.get('selectedClass');
      if(classId == selectedClass){
        return "selected" }
    },
    //select show name
    'showSelectedClass': function(){
      var selectedClass = Session.get('selectedClass');
      return ClassList.findOne(selectedClass);
    }
  });
  ///***All attached to checksheet.html
  Template.checksheet.events({
    'click .class': function(){
        var classId = this._id;
        Session.set('selectedClass' , classId);
        var selectedClass = Session.get('selectedClass');
        console.log(selectedClass);
    },
    // remove Class
    'click .remove': function(){
      var selectedClass = Session.get('selectedClass');
      ClassList.remove(selectedClass);
    }
  });

  Template.addClass.events({
    'submit form': function(event){
      event.preventDefault();
      var classNameVar = event.target.className.value;
      var classNumberVar = event.target.classNumber.value;
      ClassList.insert({
        className: classNameVar,
        classNumber: classNumberVar
      });
    }
  });

    Template.defaultClass.events({
        'submit form': function(event){
            event.preventDefault();
            Meteor.call('removeAllPosts'); //attempt to clear db
            ClassList.insert({className: "Discrete Math for CS I", classNumber: 125});
            ClassList.insert({className: "IT Fundamentals", classNumber: 130});
            ClassList.insert({className: "Comp Sci I", classNumber: 135});
            ClassList.insert({className: "Comp Sci II", classNumber: 136});
            ClassList.insert({className: "Web Programming", classNumber: 242});
            ClassList.insert({className: "IT Systems", classNumber: 253});
            ClassList.insert({className: "Computer Networks", classNumber: 311});
            ClassList.insert({className: "Information Security", classNumber: 341});
            ClassList.insert({className: "Indroduction to Database Sys", classNumber: 356});
            ClassList.insert({className: "Software Engineering", classNumber: 354});
            ClassList.insert({className: "Seminar in CSC", classNumber: 385});
        }
    });
}

if(Meteor.isServer){
  //Server side run here
    Meteor.startup(function() {
        return Meteor.methods({
            removeAllPosts: function() {
                return ClassList.remove({});
            }
        });
    });
}

//****Database input****
//ClassList.insert({
  //name: "David",
  //score: 0 });