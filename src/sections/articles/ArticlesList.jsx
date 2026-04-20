import IELTS from "../../assets/articles/IELTS.jpg";
import TOEFFL_IBT from "../../assets/articles/ETS_TOEFL_iBT_310.webp";
import Khan_academy from "../../assets/articles/Khan_Academy.png";
import TOEFL from "../../assets/articles/TOEFL.png";

export const ArticlesList = [
  {
    id: 1,
    key: "ielts", // 🔑 используем для i18n
    image: IELTS,
    url: "https://ielts.org/organisations/ielts-for-organisations/why-accept-ielts",
  },
  {
    id: 2,
    key: "toefl-ets",
    image: TOEFFL_IBT,
    url: "https://www.ets.org/toefl/test-takers/ibt/prepare/sample-test.html",
  },
  {
    id: 3,
    key: "khan-academy",
    image: Khan_academy,
    url: "https://www.khanacademy.org/humanities/grammar",
  },
  {
    id: 4,
    key: "toefl-test",
    image: TOEFL,
    url: "https://test-english.com/exams/toefl-ibt/toefl-ibt-exam-1-reading/",
  },
];
