import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    card: {
        width: 200,
        margin: '10px'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const CardDisplay = ({ card, deleteCard }) => {
    const classes = useStyles();
    return (
        <div>  <div className={classes.container}>
            {card.map((repo, index) => {
                return (<Card key={index} className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Repository
                      </Typography>
                        <Typography variant="h5" component="h2">
                            {repo.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {repo.owner.login}
                        </Typography>
                        <CardMedia
                            className={classes.media}
                            image={repo.owner.avatarUrl}
                            title={`${repo.owner.login} image`}
                        />
                        <Typography variant="body2" component="p">
                            Fork Count: {repo.forkCount}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Watchers: {repo.watchers.totalCount}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Stargazers: {repo.stargazers.totalCount}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => deleteCard(index)}>Delete</Button>
                    </CardActions>
                </Card>)
            })}</div>
        </div>
    )
}

export default CardDisplay;