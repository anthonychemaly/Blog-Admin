import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Spinner,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import ArticleCard from "components/ArticleCard/ArticleCard";
import { getAllBlogs } from "../../network/ApiAxios";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const tryGetBlogs = async () => {
    const response = await getAllBlogs();
    const { data } = response;
    if (data.success) {
      setBlogs(data.data);
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    tryGetBlogs();
  }, []);

  return (
    <div>
      <>
        <Header />
        <Container className=" mt--7" fluid>
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Blogs</h3>
                </CardHeader>
                <CardBody>
                  {isLoaded ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                      }}
                    >
                      <ArticleCard
                        title={"New Article"}
                        image="https://monophy.com/media/ls7GgHVNPvU0TeutfY/monophy.gif"
                        text={"Create New Article"}
                        id={"new"}
                      />
                      {blogs.map((item, index) => (
                        <ArticleCard
                          key={index}
                          title={item.title}
                          image={item.image !== undefined && item.image.url}
                          text={item.body}
                          id={item._id}
                          item={item}
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Spinner
                        style={{ width: "3rem", height: "3rem" }}
                        type="grow"
                      />
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    </div>
  );
}

export default Blogs;
