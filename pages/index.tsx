import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import { EventHandler, useCallback, useEffect, useState } from 'react'



const inter = Inter({ subsets: ['latin'] })
let pageToShow=0

function Home() {
  const { data: session } = useSession()
 const [allPosts, setAllPosts] = useState([]);
 const [allComments, setAllComments] = useState([]);
 const [postToShow, setPostToShow] = useState([]);
 const [commentId, setCommentId] = useState(0);
 const [changeId, setChangeId] = useState(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const [showChangeModal, setShowChangeModal] = useState<boolean>(false);
  
  function clickmodal() {
    setShowModal(!showModal);
  }




  const getAllPosts = useCallback(() => {
    // let url = new URL(URL_KEY + '/api/products');
    // url.searchParams.append('offset', offset.toString());
    // url.searchParams.append('limit', limit.toString());

    fetch("/api/getPosts".toString())
      .then((res) => {
        if (res.status !== 200) throw res.json();
        return res.json();
      })
      .then((res) => {
        res.reverse()
        setAllPosts(res);

      })
      .catch((err) => {
        console.log(err);
      });
    
      fetch("/api/getComments".toString())
      .then((res) => {
        if (res.status !== 200) throw res.json();
        return res.json();
      })
      .then((res) => {
        res.reverse()
        setAllComments(res);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);





console.log(allComments)


  async function createPost(e:any) {
    e.preventDefault();
    clickmodal()


    const postBody = e.target.postBody.value; // accessing directly
    const postTitle = e.target.elements.postTitle.value;
    const posterName = session?.user?.name;
    
    
    console.log(postTitle)
    console.log(postBody)
    
    
    console.log(posterName)
    fetch("/api/createPost", {
    method: "POST",
    body: JSON.stringify({
    postBody: postBody,
    postTitle: postTitle,
    posterName:posterName,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
  })
  .then((response) => console.log(response.json()))
  .then((json) => window.location.replace("http://localhost:3000"));
  }
  async function changePost(e:any) {
    e.preventDefault();
    clickmodal()


    const postBody = e.target.postBody.value; // accessing directly
    const postTitle = e.target.elements.postTitle.value;
    const posterName = session?.user?.name;
    
    
    console.log(postTitle)
    console.log(postBody)
    
    
    console.log(posterName)
    fetch("/api/changePost", {
    method: "POST",
    body: JSON.stringify({
    postBody: postBody,
    postTitle: postTitle,
    posterName: posterName,
    postId:changeId,
    
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
  })
  .then((response) => console.log(response.json()))
  .then((json) => window.location.replace("http://localhost:3000"));
  }




  async function createComment(e:any) {
    e.preventDefault();

    const postBody = e.target.postBody.value; // accessing directly
    const posterName = session?.user?.name;
    console.log(commentId)
    
    
    
    fetch("/api/createComment", {
    method: "POST",
    body: JSON.stringify({
    postBody: postBody,
    posterName:posterName,
    postId:commentId,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
  })
  .then((response) => console.log(response.json()))
  .then((json) => window.location.replace("http://localhost:3000"));
  }



const paginateGood= (array:any, page_size:number, page_number:number)=>{
 return array.slice(page_number * page_size, page_number * page_size + page_size);
  };
  

  // function pagination(page_number: number) { 
  //   postToShow.push(paginateGood(allPosts,5,0))
  // }

  
  const pagination = useCallback((page_number:number) => {
   setPostToShow(paginateGood(allPosts,5,page_number))
 }, [allPosts]);
  
  

  useEffect(() => {
    pagination(0);
  }, [pagination])


let totalPages= Math.ceil(allPosts.length/5)


  function nextPage() {
    if (pageToShow + 1 == totalPages) {
      
    }else{
    pageToShow = pageToShow + 1
    pagination(pageToShow);
      }
    }
  function prevPage() {
    if (pageToShow == 0) {

    }else{
      pageToShow = pageToShow - 1
      pagination(pageToShow);
      }
  }

  function clickCommentModal(e:any) {
    setCommentId(e.target.id)
    setShowCommentModal(!showCommentModal);
  
  }


  function deletePost(e:any) {
    let deleteId = e.target.id
    
    fetch("/api/deletePost", {
    method: "POST",
    body: JSON.stringify({
    postId:deleteId,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
  })
  .then((response) => console.log(response.json()))
  .then((json) => window.location.replace("http://localhost:3000"));


  }

  function clickChangeModal(e: any) {
    setChangeId(e.target.id)
    setShowChangeModal(!showChangeModal)
  }

  if (session) {
    let ownPosts= allPosts.filter((o: any) => {
      if(o.posterName == session.user?.name) return true
    })
 
  return (
    <>
      <Head>
        <title>Gjeste Bok</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.left}>
          <div className={styles.allPostsContainer}>
            {postToShow.map((o: any) => {
              let comments:any = allComments.filter((ob: any) => {
              if(ob.postId == o.id) return true
              })
              var mySqlDate = o.postDate.slice(0, 19).replace("T", " ");

              console.log(comments)
              if (session.user?.name == "Admin") {
                return (
              <>
                <div key={o} className={styles.postContainer}>
                  <h1>{o.postTitle}</h1>
                      <p>{o.PostBody}</p>
                      <br/>
                  <p>Skrevet av: {o.posterName}</p>
                  <p>{mySqlDate}</p>
                  <button onClick={clickChangeModal} className={styles.button} id={o.id}>Endre</button>
                  <button onClick={deletePost} className={styles.button} id={o.id}>slett</button><br/><br/>
                  <button className={styles.button} onClick={clickCommentModal} id={o.id}>legg igjen kommentar</button>
                  <h2>comments:</h2>
                  {comments.map((obj: any) => {
                    return (
                      <>
                        <div className={styles.postContainer}>
                            <h3 key={obj.idC}>Comment from {obj.posterName}</h3>
                            <p>{obj.posterBody}</p>
                            <p>{obj.posterDate}</p>
                          </div>
                      </>
                        )
                  })}
                </div>
              </>
                  )
            }else
            return (
              <>
                <div key={o} className={styles.postContainer}>
                  <h1>{o.postTitle}</h1>
                  <p>{o.PostBody}</p>
                  <br></br>
                  <p>Skrevet av: {o.posterName}</p>
                  <p>{o.mySqlDate}</p>
                  <button className={styles.button} onClick={clickCommentModal} id={o.id}>legg igjen kommentar</button>
                  <h2>comments:</h2>
                  {comments.map((obj: any) => {
                    return (
                      <>
                        <div className={styles.postContainer}>
                            <h3 key={obj.idC}>Comment from {obj.posterName}</h3>
                            <p>{obj.posterBody}</p>
                            <p>{obj.posterDate}</p>
                          </div>
                      </>
                        )
                  })}
                </div>
              </>
            )
            })}
            <div className={styles.paginationStyle}>
            <h2>Page {pageToShow+1} of {totalPages}</h2>
          <button onClick={prevPage} className={styles.button}>click for prev</button>
              <button onClick={nextPage} className={styles.button}>click for next</button>
        {showCommentModal &&
          <div className={styles.modal}>
            <div className={styles.modalcontent}>
              <span className={styles.close} onClick={clickCommentModal}>&times;</span>
              <form onSubmit={createComment} method='POST'>
                <h1>legg igjen kommentar</h1>
                <p>Tekst:</p>
                <textarea className={styles.textInputBody} name="postBody" id='postBody'></textarea><br />
                <input type="submit" className={styles.submitButton}></input>
              </form>
            </div>
          </div>
          }
          </div>
          </div>
        </div>
        <div className={styles.right}>
          <h1>Lag en post!</h1>
          <button className={styles.button} onClick={clickmodal}>Lag en post!</button>
          {showModal &&
          <div className={styles.modal}>
            <div className={styles.modalcontent}>
              <span className={styles.close} onClick={clickmodal}>&times;</span>
              <form onSubmit={createPost} method='POST'>
                <h1>Lag en Post!</h1>
                <p>Tittel:</p>
                <input type="text" max="45" className={styles.textInputTitle} name="postTitle" id='postTitle'></input>
                <p>Tekst:</p>
                <textarea className={styles.textInputBody} name="postBody" id='postBody'></textarea><br />
                <input type="submit" className={styles.submitButton}></input>
              </form>
            </div>
          </div>
          }
          <h3>Dine Posts:</h3>
          {ownPosts.map((o:any) => {
            return(
            <>
              <div key={o} className={styles.postContainer}>
                <div className={styles.ownPosts}>
                  <h3>{o.postTitle}</h3>
                  <p>{o.PostBody}</p>
                  <button onClick={clickChangeModal} className={styles.button} id={o.id}>Endre</button>
                  <button onClick={deletePost} className={styles.button} id={o.id}>slett</button>
                </div>
              </div>
            </>
            )
          })}
          {showChangeModal &&
          <div className={styles.modal}>
            <div className={styles.modalcontent}>
              <span className={styles.close} onClick={clickChangeModal}>&times;</span>
              <form onSubmit={changePost} method='POST'>
                <h1>endre Post!</h1>
                <p>Tittel:</p>
                <input type="text" max="45" className={styles.textInputTitle} name="postTitle" id='postTitle'></input>
                <p>Tekst:</p>
                  <textarea className={styles.textInputBody} name="postBody" id='postBody'></textarea><br />
                <input type="submit" className={styles.submitButton}></input>
              </form>
            </div>
          </div>
          }
        </div>
      </main>
    </>
  )
  }
  return (
    <>
      <Head>
        <title>Logg inn</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className={styles.mainNotLoggedIn}>
        <h1>Logg inn for å se inlegg</h1>
        <h2>Registrering trenges ikke, man trenger bare å logge inn med google</h2>
        </main>
    </>
  )
}

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

export default Home
