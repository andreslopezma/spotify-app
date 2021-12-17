import React, { Fragment, useEffect, useState } from "react";
import { Col, Figure, Row, Spinner, Table } from "react-bootstrap";

const Album = ({ idAlbum }) => {
    const [albumns, setAlbumns] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        getAlbum();
    }, []);

    const getAlbum = () => {
        fetch(`https://api.spotify.com/v1/albums/${idAlbum}`, {
            headers: {
                'Authorization': 'Bearer BQAPEbqjGqjqQAiinoHvDeyN46Io61RND8Vp4S0mI96bOBPvjrF73AMmlm-SzZWhQrCSGt7GO934Rm9uEK4'
            }
        }).then(response => {
            if (!response.ok) {
                throw Error("Oops can't get the info");
            }
            return response.json();
        }).then(data => {
            setAlbumns(data);
            setLoading(true);
        }).catch(err => {
            setError(err.message);
            setIsError(true);
        });
    }
    return (
        <Fragment>
            <Row className="mt-3">
                <Col>
                    <Figure>
                        <Figure.Image 
                            src={loading && albumns.images[1].url}
                            roundedCircle={true}
                        />
                    </Figure>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover size="lg" variant="dark" className="mt-3">
                        <colgroup width="10%" />
                        <colgroup width="70%" />
                        <colgroup width="20%" />
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name Track</th>
                                <th>Music</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading ?
                                <tr>
                                    <td className="text-center" colSpan={3}>
                                        {isError ? error : <Spinner animation="grow" variant="light" />}
                                    </td>
                                </tr> :
                                albumns.tracks.items.map((track, index) => {
                                    return (
                                        <tr key={track.id}>
                                            <td className="text-center">{track.track_number}</td>
                                            <td className="text-center">{track.name}</td>
                                            <td>
                                                <audio src={track.preview_url} controls></audio>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Fragment>
    );
}

export default Album;