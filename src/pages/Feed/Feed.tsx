import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Feed.css";
import { calculateRating } from "@entities/course/lib/calculateRating";
import { formatDate } from "@entities/course/lib/formatDate";
import fetchCourses from "@entities/feedback/model/fetchCourses";
import fetchUserCoursesData from "@entities/user/model/fetchUserCourses";
import { filterCourses } from "../../entities/course/lib/filterCourses";
import { filterCoursesByName } from "@/entities/course/lib/filterCoursesByName";

export interface Course {
  id: number;
  name: string;
  university: string;
  date: string;
  price: number;
  amount_of_students: number;
  feedback: { rating: number }[];
  image: string;
  course_id?: number;
}

function Feed() {
  window.scrollTo(0, 0);
  const { id } = window.Telegram.WebApp.initDataUnsafe.user;
  console.log(window.Telegram.WebApp.initData);
  //const { id } = 10;
  const [data, setData] = useState<Course[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [userCourses, setUserCourses] = useState<Course[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const courses = await fetchUserCoursesData(id, navigate);
      if (courses) {
        setUserCourses(courses);
      }
    };

    fetchData();
  }, [id, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCourses("");
        result.reverse();
        console.log(result);

        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!userCourses) {
    return <div className="loading"></div>;
  }

  const filteredData = filterCoursesByName(data, inputValue);

  const filteredDataWithMain = filterCourses(filteredData);

  const handleUniChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const appCourses = filteredDataWithMain.map((item: Course, index) => {
    const averageRate =
      item.feedback.length > 0
        ? calculateRating(
            item.feedback.map((f) => ({ rate: f.rating.toString() }))
          )
        : 0;

    return (
      <Link to={`/course/${item.id}`} key={index} className="course_card">
        <div
          className="course_img"
          style={{ backgroundImage: `url(https://comncourse.ru${item.image})` }}
        ></div>
        <div className="card_info">
          <div className="row_grad_l">
            <div
              className="grad_l"
              style={{
                width: `calc((100% / 5) * ${averageRate})`,
                background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`,
              }}
            ></div>
          </div>
          <div
            style={{
              width: "calc(100% - 16px)",
              backgroundColor: "black",
              height: "16px",
              borderRadius: "16px",
              zIndex: "-10",
              marginTop: "-16px",
            }}
          ></div>
          <div className="points">
            <div
              className="point"
              style={{
                fontFamily: "NeueMachina",
                fontSize: "16px",
                lineHeight: "20px",
              }}
            >
              <b>{item.name}</b>
            </div>
            <div
              className="point"
              style={{ color: "#AAAAAA", fontSize: "14px" }}
            >
              {item.university}
            </div>
            <div
              className="point"
              style={{ color: "#AAAAAA", marginTop: "4px", fontSize: "14px" }}
            >
              {formatDate(item.date)}
            </div>
          </div>
          <div className="price_container">
            {Number(item.price) === 0 ? (
              <div className="price">БЕСПЛАТНО</div>
            ) : (
              <div className="price">{item.price} RUB</div>
            )}
            <div className="status_container">
              <div className="student_amount">{item.amount_of_students}</div>
              {userCourses &&
                userCourses.some((course) => course.course_id === item.id) && (
                  <div className="course_status">Куплено</div>
                )}
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="column" style={{ minHeight: "100vh" }}>
      <div className="feed_top_panel">
        <Link to={`/profile`} className="profille_btn"></Link>
        <input
          className="billet_search"
          onChange={handleUniChange}
          placeholder="Поиск"
          value={inputValue}
        />
        <Link to={`/wallet`} className="wallet_btn"></Link>
      </div>
      {appCourses}
    </div>
  );
}

export default Feed;