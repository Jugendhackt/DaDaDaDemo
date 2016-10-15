Template.DemoSite.helpers({
    "teilnehmer":function(){
        return Events.findOne(this._id).teilnehmer.indexOf(Meteor.userId()) >= 0
    },
    "ami_admin":function(){
        let ev = Events.findOne(this._id)
        if (ev){
            return ev.veranstalter.indexOf(Meteor.userId()) >= 0
        }
        else{
            return false
        }
    }


})

Template.DemoSite.events({
    "click #join":function(){
        if(Events.findOne(this._id).teilnehmer.indexOf(Meteor.userId()) >= 0){
            Meteor.call("leave_Event",this._id)
        }else{
            Meteor.call("join_Event",this._id)
        }

    },
    "click #remove_demo_button":function(){
        Meteor.call("delete_Event",this._id)
        Router.go("/")
    }
})



