import NewMeetupForm from "../../components//meetups/NewMeetupForm";
//import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
   // router.replace("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add Meetup</title>
        <meta name="description" content='adding new meetup' />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
