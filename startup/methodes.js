Meteor.methods({
    "insert_Event":function(data){
        if(!(Meteor.userId()) && data.veranstalter.indexOf(Meteor.userId()) >= 0 ){
            throw new Meteor.Error("not-authorized");
        }
        Events.insert(data)
    },
    "update_Event":function(id,data){
        if(!(Meteor.userId()) && data.veranstalter.indexOf(Meteor.userId()) >= 0){
            throw new Meteor.Error("not-authorized");
        }
        Events.update(id,{$set:data})
    },
    "update_Event_raw":function(id,data_raw){
        if(!(Meteor.userId()) && data.veranstalter.indexOf(Meteor.userId()) >= 0){
            throw new Meteor.Error("not-authorized");
        }
        Events.update(id,data_raw)
    },
    "delete_Event":function(id){
        if(!(Meteor.userId()) && data.veranstalter.indexOf(Meteor.userId()) >= 0){
            throw new Meteor.Error("not-authorized");
        }
        Events.remove(id)
    },
    "join_Event":function(event_id){
        if(!(Meteor.userId())){
            throw new Meteor.Error("not-authorized");
        }
        console.log(event_id)
        if(Events.findOne(event_id).teilnehmer.indexOf(Meteor.userId()) < 0){
            Events.update(event_id,
                {$push: {teilnehmer: Meteor.userId()},
                 $inc: {teilnehmerzahl:1}}

            )
        }
        else{
            console.log("Bereits Teilnehmer")
        }
    },
    "leave_Event":function(event_id){
        if(!(Meteor.userId())){
            throw new Meteor.Error("not-authorized");
        }
        console.log(event_id)
        if(Events.findOne(event_id).teilnehmer.indexOf(Meteor.userId()) >= 0){
            Events.update(event_id,
                {$pull: {teilnehmer: Meteor.userId()},
                $inc: {teilnehmerzahl:-1}}
            )

        }
        else{
            console.log("Kein Teilnehmer")
        }
    },
})
