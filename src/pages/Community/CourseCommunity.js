import React, { useState, useEffect } from "react";

import { api_url } from "../../configs/api";

import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";


import styles from './table.css';




function Course() {
  const [subjectList, setSubjectList] = useState([]);
  const [subjectReviews, setSubjectReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true)
  /** get all subject api */


  //------------------------------- Rating ------------------------------------------

  function StarRating({ count, value,
    inactiveColor,
    size,
    activeColor, onChange }) {

    // short trick 
    const stars = Array.from({ length: count }, () => '🟊')

    // Internal handle change function
    const handleChange = (value) => {
      onChange(value + 1);
    }
    return (
      <div>
        {stars.map((s, index) => {
          let style = inactiveColor;
          if (index < value) {
            style = activeColor;
          }
          return (
            <span className={"star"}
              key={index}
              style={{ color: style, width: size, height: size, fontSize: size }}
              onClick={() => handleChange(index)}>{s}</span>
          )
        })}
        <div style={{ fontSize: "12px" }} >{value}</div>
      </div>
    )
  }
  const [rating, setRating] = useState();
  const handleChange = (value) => {
    setRating(value);
  }
  //------------------------------- END Rating ------------------------------------------


  function getSubjectReviewsAPI() {
    var sum = 0;
    console.log("เรียก API Subject Reviews");
    axios
      //.get(`${api_url}/subject-reviews?subject=${parm}`)
      .get(`${api_url}/subject-reviews`)
      .then((res) => {
        setSubjectReviews(res.data);
        console.log(subjectReviews);

        // subjectReviews.map((subjectReviews) => {
        //   console.log(subjectReviews);
        //   console.log("Rating : ", subjectReviews.rating);
        //   // sum = subjectReviews.rating+ subjectReviews.rating;
        //   // console.log("Sum : ",sum);
        //   // console.log("เข้าtReviews");
        //   // console.log(subjectReviews._id);
        //   // console.log(subjectReviews.rating);
        // });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getSubjectListAPI() {

    axios
      .get(`${api_url}/subjects`)
      .then((res) => {
        setSubjectList(res.data);
        console.log(res.data);
        setLoading(false);
        //  console.log(res.data[0].subject_reviews[0].rating);
        //  subjectList.map((subjectList) => {

        //     if (subjectList.subject_reviews.length > 0) {
        //       console.log("ต้น ---------------------------------");
        //       console.log(subjectList._id);
        //       console.log(getSubjectReviewsAPI(subjectList._id));
        //       console.log("--------------------------------- จบ");
        //     } else {
        //       console.log("ต้น else ---------------------------------");
        //       var t = subjectList.subject_reviews.rating;
        //       t = 0;
        //       console.log(t);
        //       console.log("---------------------------------else จบ");
        //     }

        //   });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getSubjectListAPI();
    getSubjectReviewsAPI();
  }, []);
  // for (let index = 0; index < array.length; index++) {
  //   const element = array[index];

  // }
  //   if()
  //   console.log("TEST  =  ", subjectList[0].subject_reviews[0].rating);
  //console.log("TEST  =  ", subjectList.subject_reviews[0].rating);

  //const pro = [...subjectList, ...subjectReviews];
  //const combined1 = subjectList.push(...subjectReviews);

  return (
    <div className="min-h-screen   bg-blue-100 flex flex-col   ">
      <div className="min-w-full p-2  mb-5">
        <div
          className="mx-auto w-full  p-5 font-base flex flex-col justify-between   "
          style={{ height: "100%" }}
        >
          <div className="w-full h-3/5 bg-white rounded-xl float-right shadow-lg text-sm flex flex-col justify-between ">
            {/** Head */}
            <div className="w-full h-10 rounded-t-xl bg-blue-300 flex  items-center pl-3">
              ชุมชนรายวิชา
            </div>
            <div className="flex flex-wrap flex-row bg-blue-100 p-5 ">
              <div className="display-flex flex-row w-full pr-1 center">
                <label>ค้นหารหัสวิชา</label>
                <input
                  style={{
                    width: "88%",
                    height: "2.5rem",
                    borderRadius: "0.375rem",
                    paddingLeft: "1rem",
                    marginLeft:"1.2rem"
                  }}
                  type="text"
                  placeholder="Search here"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className=" md:w-auto justify-center" style={{ margin: "50px" }}>
              <table className="w-full table-fixed content-start border-0 border-opacity-0 py-1" className={styles.table}>
                <thead className="border-0 border-opacity-2 w-full mx-1">
                  <tr>
                    <th className="border-0 border-opacity-0 w-1/6 py-5">
                      รหัสวิชา
                    </th>
                    <th className="border-0 border-opacity-0 w-2/6 py-5">
                      ชื่อวิชา
                    </th>
                    <th className="border-0 border-opacity-0 w-1/6 py-5">
                      หน่วยกิต
                    </th>
                    <th className="border-0 border-opacity-0 w-1/6 py-5">
                      คะแนนรีวิว
                    </th>
                    <th className="border-0 border-opacity-0 w-1/6 py-5">
                      จำนวนรีวิว
                    </th>
                  </tr>

                </thead>

                <tbody className="px-8">
                  {/* ติด Error loading */}
                  {loading ? (<tr><td></td> <td></td> <td><div className=" Loader text-center md:w-auto justify-center "></div></td></tr>) : ""}
                 
                  {subjectList
                    .filter((item) => {
                      if (search == "") {
                        return item;
                      } else if (
                        item.subj_code.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return item;
                      }
                    })

                    .map((item, index) => {

                      if (item.subject_reviews.length > 0) {
                        let max = item.subject_reviews.length;
                        console.log("Max : ", max);
                        for (let i = 0; i < max; i++) {
                          // const element = array[i]; subjectList[0].subject_reviews[0].rating
                          var sum = subjectList[index].subject_reviews[i].rating;
                          console.log("รอบ : ", i, "     ", sum);
                          // const result = subjectList.reduce((total, subject_reviews) => total = total + subject_reviews.rating, 0);
                          // console.log("result : ", result);
                        }
                        //const result = data.reduce((total, currentValue) => total = total + currentValue.prix, 0);
                        // setRating(sum);
                      } else {
                        sum = 0;
                        // setRating(0);
                      }
                      return (
                        <tr
                          className="border-2 border-gray-900 hover:bg-blue-500 shadow-lg"
                          key={index}
                        >
                          <td className="py-4 text-center mt-24">
                            {item.subj_code}
                          </td>
                          <td className="py-4  mt-24">
                            {item.subj_fullname}
                          </td>
                          <td className="py-4 text-center  mt-24" >
                            {item.subj_credit}
                          </td>
                          <td className="py-4 mt-24 text-center">
                            <StarRating
                              count={5}
                              size={16}
                              value={sum}
                              // value={rating}
                              activeColor={'#ffc107'}
                              inactiveColor={'#ddd'} //สีที่ไม่ถูกเลือก
                            //onChange={handleChange} //เปล่ยนค่าดาว
                            />
                          </td>
                          <td className="py-4 mt-24 text-center">  {item.subject_reviews.length} </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;
