import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Facebook, Twitter, Instagram } from '@material-ui/icons';
import './Footer.css'; // Import the CSS file

const useStyles = makeStyles((theme) => ({
    footerContent: {
        textAlign: 'center',
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className="footer">
            <Container maxWidth="lg">
                <Grid container spacing={3} className={classes.footerContent}>
                    <Grid item xs={12} sm={4}>
                        <h4>Quick Links</h4>
                        <div>
                            <Link to="/" className="link">Home</Link>
                            <Link to="#" className="link">Menu</Link>
                            <Link to="#" className="link">Contact</Link>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <IconButton aria-label="Facebook">
                                <Facebook className="social-icon" />
                            </IconButton>
                            <IconButton aria-label="Twitter">
                                <Twitter className="social-icon" />
                            </IconButton>
                            <IconButton aria-label="Instagram">
                                <Instagram className="social-icon" />
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4} className='fs-5'>
                        <p>&copy; {new Date().getFullYear()} Gofood App</p>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
};

export default Footer;
















