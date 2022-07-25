import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import classes from "../../components/meetups/meetupDetail.module.css";
function MeetupDetail(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetup.title} </title>
        <meta name="description" content={props.meetup.description} />
      </Head>
      <section className={classes.detail}>
        <img src={props.meetup.image} alt={props.meetup.title} />
        <h1>{props.meetup.title}</h1>
        <address>{props.meetup.address}</address>
        <p>{props.meetup.description}</p>
      </section>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://fadhel:fadhel@cluster0.pi09p.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close;
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://fadhel:fadhel@cluster0.pi09p.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const id = ObjectId(meetupId);
  const selectedMeetup = await meetupsCollection.findOne({ _id: id });
  client.close;
  console.log(selectedMeetup);
  return {
    props: {
      meetup: {
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        id: selectedMeetup._id.toString(),
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetail;
