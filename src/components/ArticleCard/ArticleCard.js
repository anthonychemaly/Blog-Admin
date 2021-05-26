import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardText,
  CardImg,
  CardTitle,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

export default class ArticleCard extends Component {
  render() {
    return (
      <div>
        <>
          <Card style={{ width: "18rem", marginTop: "1%" }}>
            <div
              alt="..."
              src={this.props.image !== undefined && this.props.image}
              // top
              style={{
                height: 200,
                width:"100%",
                backgroundImage: `url(${
                  this.props.image !== undefined && this.props.image
                })`,
                backgroundSize:"cover"
              }}
            />
            <CardBody>
              <CardTitle>{this.props.title}</CardTitle>
              <p>{this.props.text.substring(0, 28) + "..."}</p>

              <Link
                to={{
                  pathname: "/admin/blog/" + this.props.id,
                  params: { item: JSON.stringify(this.props.item) },
                }}
              >
                <Button color="primary">Access</Button>
              </Link>
            </CardBody>
          </Card>
        </>
      </div>
    );
  }
}
