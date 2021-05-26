import React, { useState, useEffect } from "react";

import {
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import {
  getBlog,
  editBlog,
  postBlog,
  deleteBlogReq,
} from "../../network/ApiAxios";
import Spinner from "reactstrap/lib/Spinner";
import Axios from "axios";
import ButtonGroup from "reactstrap/lib/ButtonGroup";

function BlogDetails({ match }) {
  const [error, setError] = useState("");
  // const [blog, setBlog] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [uploading, setisUploading] = useState(false);
  const [imageId, setImageId] = useState("");

  const [id, setId] = useState(match.params.id);

  useEffect(() => {
    if (match.params.id !== "new") {
      tryFetchBlog(match.params.id);
    }
  }, []);

  const tryFetchBlog = async (blogId) => {
    const response = await getBlog(blogId);
    const { data } = response;
    if (data.success) {
      setError("");
      setTitle(data.data.title);
      setBody(data.data.body);
    } else {
      setError(data.message);
      setTitle("");
      setBody("");
    }
  };

  const submit = async () => {
    if (id === "new") {
      tryCreateBlog();
    } else {
      tryEditBlog();
    }
  };

  const deleteBlog = async () => {
    tryDeleteBlog();
  };

  const tryEditBlog = async () => {
    const response = await editBlog(id, title, body);
    const { data } = response;
    if (data.success) {
      setError("");
      // setTitle(data.data.title);
      // setBody(data.data.body);
    } else {
      setError(data.message);
      // setTitle("");
      // setBody("");
    }
  };

  const tryCreateBlog = async () => {
    const response = await postBlog(title, body, imageId);
    const { data } = response;
    if (data.success) {
      setError("");
      // setTitle(data.data.title);
      // setBody(data.data.body);
    } else {
      setError(data.message);
      // setTitle("");
      // setBody("");
    }
  };
  const tryDeleteBlog = async () => {
    const response = await deleteBlogReq(id);
    const { data } = response;
    if (data.success) {
      setError("");
      // setTitle(data.data.title);
      // setBody(data.data.body);
    } else {
      setError(data.message);
      // setTitle("");
      // setBody("");
    }
  };

  const tryAddImageToBlog = async (image) => {
    setisUploading(true);
    // const response = await addImageToBlog(id, image);
    var formData = new FormData();
    formData.append("file", image);
    formData.append("blogId", id);

    Axios.post(
      "https://obtainable-observant-answer.glitch.me/blogs/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((response) => {
      const { data } = response;
      console.log(response);
      if (data.success) {
        setError("");
        setisUploading(false);
        // setTitle(data.data.title);
        // setBody(data.data.body);
      } else {
        setError(data.message);
        setisUploading(false);
        // setTitle("");
        // setBody("");
      }
    });
  };

  const tryAddImageToNewBlog = async (image) => {
    setisUploading(true);
    var formData = new FormData();
    formData.append("file", image);
    Axios.post(
      "https://obtainable-observant-answer.glitch.me/blogs/image/initial",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((response) => {
      const { data } = response;
      console.log(response);
      if (data.success) {
        setError("");
        setisUploading(false);
        setImageId(data.data._id);
        // setTitle(data.data.title);
        // setBody(data.data.body);
      } else {
        setError(data.message);
        setisUploading(false);
        // setTitle("");
        // setBody("");
      }
    });
  };

  return (
    <div>
      <>
        <Header />
        <Container className=" mt--7" fluid>
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Icons</h3>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="6">
                        {/* <h6>{JSON.stringify(blog)}</h6> */}
                        <FormGroup>
                          <h6 className="heading-small text-muted mb-4">
                            Article Title
                          </h6>
                          <Input
                            className="form-control-alternative"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <h6 className="heading-small text-muted mb-4">
                            Article Body
                          </h6>
                          <Input
                            className="form-control-alternative"
                            placeholder="Body"
                            type="textarea"
                            value={body}
                            onChange={(e) => {
                              setBody(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        {/* <h6>{JSON.stringify(blog)}</h6> */}
                        <FormGroup>
                          <h6 className="heading-small text-muted mb-4">
                            Article Image
                          </h6>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <Input
                              className="form-control-alternative"
                              placeholder="Title"
                              // value={title}
                              type="file"
                              onChange={(e) => {
                                if (id === "new") {
                                  tryAddImageToNewBlog(e.target.files[0]);
                                } else {
                                  tryAddImageToBlog(e.target.files[0]);
                                }
                              }}
                            />
                            {uploading && (
                              <div style={{ paddingLeft: "3%" }}>
                                <Spinner />
                              </div>
                            )}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <ButtonGroup>
                          <Button onClick={submit}>Submit</Button>
                          {id !== "new" && (
                            <Button color="danger" onClick={deleteBlog}>
                              Delete
                            </Button>
                          )}
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    </div>
  );
}

export default BlogDetails;
