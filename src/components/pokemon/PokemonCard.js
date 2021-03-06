import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import spinner from "../../images/spinner.gif";

const Sprite = styled.img`
  width: 5em;
  height: 5em;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -o-user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    type: "",
    imageLoading: true,
    tooManyRequests: false,
  };

  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    // const imageUrl = `https://github.com/PokeApi/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    const imageUrl2 = `https://pokeres.bastionbot.org/images/pokemon/${pokemonIndex}.png?raw=true`;
    this.setState({
      name: name,
      imageUrl: imageUrl2,
      pokemonIndex: pokemonIndex,
    });
  }

  render() {
    return (
      <div className="col-md-5 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
          <Card className="card">
            <div className="card-header d-flex flex-row align-items-center">
              <h5>{this.state.pokemonIndex}</h5>
              {/* {this.state.imageLoading ? (
              <img
                src={spinner}
                style={{ width: "5em", height: "5em" }}
                className="card-img-top rounded mx-auto d-block mt-2"
              />
            ) : null} */}
              <Sprite
                className="card-img-top rounded mx-auto"
                onLoad={() => this.setState({ imageLoading: false })}
                onError={() => this.setState({ tooManyRequests: true })}
                src={this.state.imageUrl}
              ></Sprite>
              {this.state.tooManyRequests ? (
                <h6 className="mx-auto">
                  <span className="badge badge-danger mt-2">
                    Too Many Requests
                  </span>
                </h6>
              ) : null}
              <div className="card-body mx-auto">
                <h6 className="card-title">{this.state.name}</h6>
              </div>
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  }
}
