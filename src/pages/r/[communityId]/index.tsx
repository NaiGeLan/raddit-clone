import { Community } from "@/src/atoms/communityAtom";
import { firestore } from "@/src/firebase/clientApp";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import safeJsonStringify from 'safe-json-stringify'
type CommityPageProps = {
  communityData: Community
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log("GET SERVER SIDE PROPS RUNNING");

  try {
    console.log(context.query.communityId as string);
    if(!context.query.communityId) return
    const collectionRef = collection(firestore, 'communities', context.query.communityId.toString());
    console.log(collectionRef,'###');
    debugger
    const res = await getDocs(collectionRef)
    console.log(res,'***');
    
    getDocs(collectionRef).then((res) => {
      res.docs.map((item) => {
        console.log(item,'&&&&');
      })
    })
    // docs.data.map(doc => console.log(doc));
    // console.log(docs,'$$$$');
    
    // const communityDoc = await getDocs(collection(firestore, "communities"));
    // const communityDocRef = doc(firestore, "communities" );
    // console.log(communityDoc);
    // communityDoc.forEach(doc => console.log(doc,'$$'));
    // const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        // communityData: communityDoc.exists()
        //   ? JSON.parse(
        //       safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }) // needed for dates
        //     )
        //   : "",
      },
    };
  } catch (error) {
    // Could create error page here
    return {
      props: {
        error: JSON.parse(safeJsonStringify({error: error}))
      }
    }
    console.log("getServerSideProps error - [community]", error);
  }
}

const CommityPage:React.FC<CommityPageProps> = (props) => {
  console.log(props);
  
  return (
    <>
    
    </>
  )
}

export default CommityPage
