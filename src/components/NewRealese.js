import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const NewRelase = ({ setIdAlbum }) => {
    // use state music 
    const [musics, saveMusic] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    useEffect(() => {
        getMusic();
    }, []);

    const getMusic = () => {
        fetch('https://api.spotify.com/v1/browse/new-releases?limit=5', {
            headers: {
                'Authorization': 'Bearer BQAPEbqjGqjqQAiinoHvDeyN46Io61RND8Vp4S0mI96bOBPvjrF73AMmlm-SzZWhQrCSGt7GO934Rm9uEK4'
            }
        })
            .then(response => {
                if (Object.is(response.ok, false)) {
                    throw Error("Oops can't get the info");
                }
                return response.json();
            })
            .then(data => {
                if (Object.is(data.albums.items.length, 0)) {
                    setLoading(false);
                    return;
                }
                saveMusic(data.albums.items);
                setLoading(true);
                setError();
            }).catch(err => {
                setError(err.message);
                setLoading(true);
            });
    }

    const viewRelase = e => {
        setIdAlbum(e.target.value);
    }
    return (
        <Fragment>
            {error && <Alert className="mt-3 text-center" variant={'danger'} >{error}</Alert>}
            {!loading && <Loading />}
            {loading &&
                <Row xs={1} md={2} className="g-2 mt-2">
                    {musics.map(music => {
                        return (
                            <Col key={music.id}>
                                <Card>
                                    <Card.Img variant="top" src={music.images[1].url} />
                                    <Card.Body>
                                        <Card.Title>{music.name}</Card.Title>
                                        <Card.Text>
                                            <Row>
                                                <Col>
                                                    {music.artists.map(artist => {
                                                        return artist.name;
                                                    })}
                                                </Col>
                                                <Col>
                                                    <Link to='/album' onClick={viewRelase}>
                                                        <Button value={music.id} variant="outline-info">Go to album</Button>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            }
        </Fragment>
    )
}

export default NewRelase;