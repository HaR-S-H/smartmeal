import React, { useEffect } from 'react'
import ReviewCard from '../components/shared/ReviewCard'
import { ReviewData } from '../util/reviewData'
import axios from 'axios'
import { useState } from 'react'
import DotLoading from '../components/shared/DotLoading'
import { toast } from 'sonner'
function Review() {

    let [flow, setFlow] = useState(0);
    let [loading, setLoading] = useState(false);
    let [isReviewed , setIsReviewed] = useState(false);

    let [reviewAns, setReviewAns] = useState(ReviewData.map((item, idx) => {
        return {
            position: item.id,
            reviewName: item.reviewName,
            reviewScore: 1,
            questionText: item.questionText,
            subQuestions: item.subQuestion.map((subItem, subIdx) => {
                return {
                    subQuestionText: subItem,
                    subReviewScore: 1
                }
            })
        }
    }));
    console.log(loading);
    async function handleSubmit(finalAns) {
        try {
            console.log(finalAns);
            setLoading(true);
            let result = await axios.post(`${import.meta.env.VITE_SERVER_URL}review/create`, finalAns, { withCredentials: true });
            console.log(result.data);
            // console.log(result.data);
            if (result.status === 200) {
                setIsReviewed(true);
                toast.success("Review submitted successfully");
            }
            setLoading(false);
        }
        catch (e) {
            console.log(e);
            setLoading(false);
        }
    }
    useEffect(() => {
        async function getReview() {
            try {
                setLoading(true)
                console.log("R")
                let result = await axios.get(`${import.meta.env.VITE_SERVER_URL}review`, { withCredentials: true });
                console.log(result.data);

                setLoading(false);
                if (result.data[0]) {
                    setIsReviewed(true);
                    setReviewAns(result.data[0].wholeReview);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getReview();
    }, [setIsReviewed]);


    return (
        <div className="h-screen w-full flex flex-col gap-4 bg-slate-50 p-4 sm:p-8">
        <p className="font-bold text-3xl sm:text-5xl">Review</p>
      
        {isReviewed ? (
          <div className="h-auto sm:h-screen border-2 rounded-3xl bg-white w-full flex justify-center items-center py-8">
            <div className="flex flex-col justify-center items-center w-full sm:w-2/5 gap-5">
              <h1 className="text-2xl sm:text-3xl font-bold text-center">You Already Reviewed. Wanna Edit?</h1>
              <button
                className="bg-primary font-bold active:bg-yellow-500 max-w-xs sm:max-w-48 shadow-2xl hover:bg-yellow-400 py-3 sm:py-5 px-6 sm:px-8 rounded-xl"
                onClick={() => { setIsReviewed(false); }}
              >
                Edit Review
              </button>
            </div>
          </div>
        ) : (
          <ReviewCard
            ques={ReviewData[flow]}
            handleSubmit={handleSubmit}
            loading={loading}
            reviewAns={reviewAns}
            setReviewAns={setReviewAns}
            flow={setFlow}
          />
        )}
      </div>
      
    )

    const val = <div>

    </div>
}

export default Review