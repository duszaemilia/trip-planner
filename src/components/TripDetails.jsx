import AddNote from "./AddNote.jsx";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import {Container, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import InboxIcon from "@mui/icons-material/MoveToInbox.js";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Grid from '@mui/material/Unstable_Grid2';
import React from "react";
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";


export default function TripDetails(props) {
    return <Container maxWidth="md">
        <Grid xs={12}>
            <List
                sx={{width: '100%', maxWidth: '100%', bgcolor: 'background.paper'}}
                component="nav"
                aria-labelledby="nested-list-subheader"

            >
                <ListItemButton onClick={() => {
                }}>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary={props.trip.title} secondary={props.trip.description}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

            </List>
            <Stack spacing={4} gap={4} direction="row">
                {props.noteId === props.trip.id ? (<AddNote tripId={props.trip.id}/>) : (
                    <Button onClick={props.onClick} variant="outlined">Add note</Button>
                )}

                <Link to={`/trip-card/${props.tripId}`} >
                    <Button variant="outlined">See trip details</Button>
                </Link>
                <Button onClick={props.onClick1} data-id={props.trip.id} variant="outlined">Delete</Button>

            </Stack>
        </Grid>
    </Container>;
}

// export default TripDetails;