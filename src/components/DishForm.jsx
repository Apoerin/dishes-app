import { Form, Field } from 'react-final-form';
import axios from 'axios';

import Condition from './Condition';
import validate from "./validate";

import { Container, Button, MenuItem, Grid, Paper, Typography } from '@material-ui/core';
import { TextField, Select } from 'final-form-material-ui';

const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const onSubmit = event => {
    axios({
        method: "post",
        url: "https://frosty-wood-6558.getsandbox.com:443/dishes",
        headers: { "Content-Type": "application/json" },
        data: {
            name: event.name,
            preparation_time: event.preparation_time,
            type: event.type,
            no_of_slices: event.no_of_slices,
            diameter: event.diameter,
            spiciness_scale: event.spiciness_scale,
            slices_of_bread: event.slices_of_bread
          }
    })
        .then(function (response) {
            alert(response);
        })
        .catch(function (response) {
            alert(response);
        });
};

const DishForm = () => (
    <Container style={{ padding: 16, margin: 'auto', maxWidth: 800 }}>
        <Typography variant="h4" align="center" component="h1" style={{ padding: 16 }}>
          Choose your dish!
        </Typography>
        <Form
            onSubmit={onSubmit}
            validate={validate}
        >
            {({ handleSubmit, form, submitting, values }) => (
                <form onSubmit={handleSubmit}>
                    <Paper style={{ padding: 16 }}>
                        <Grid
                            container
                            justify="flex-start"
                            alignItems="center"
                            spacing={2}>
                            <Grid item xs={10} md={6}>
                                <Field
                                    name="name"
                                    fullWidth
                                    component={TextField}
                                    type="text"
                                    label="Dish Name"
                                />
                            </Grid>
                            <Grid item xs={10} md={4}>
                                <Field
                                    name="preparation_time"
                                    fullWidth
                                    component={TextField}
                                    type="time"
                                    label="Preparation time"
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <Field
                                    name="type"
                                    component={Select}
                                    label="Choose Dish Type"
                                    formControlProps={{ fullWidth: true }}
                                >
                                    <MenuItem value="pizza">Pizza</MenuItem>{' '}
                                    <MenuItem value="soup">Soup</MenuItem>{' '}
                                    <MenuItem value="sandwich">Sandwich</MenuItem>{' '}
                                </Field>
                            </Grid>
                            <Condition when="type" is="pizza">
                                <Grid item xs={10}>
                                    <Field
                                        name="no_of_slices"
                                        component={TextField}
                                        type="number"
                                        validate={composeValidators(minValue(4))}
                                        label="Number of slices"
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <Field
                                        name="diameter"
                                        component={TextField}
                                        type="number"
                                        step="0.1"
                                        validate={composeValidators(minValue(16))}
                                        label="Diameter"
                                    />
                                </Grid>
                            </Condition>
                            <Condition when="type" is="soup">
                                <Grid item xs={10}>
                                    <Field
                                        name="spiciness_scale"
                                        component={Select}
                                        formControlProps={{ fullWidth: true }}
                                        label="Spiciness scale"
                                    >
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                        <MenuItem value="4">4</MenuItem>
                                        <MenuItem value="5">5</MenuItem>
                                        <MenuItem value="6">6</MenuItem>
                                        <MenuItem value="7">7</MenuItem>
                                        <MenuItem value="8">8</MenuItem>
                                        <MenuItem value="9">9</MenuItem>
                                        <MenuItem value="10">10</MenuItem>
                                    </Field>
                                </Grid>
                            </Condition>
                            <Condition when="type" is="sandwich">
                                <Grid item xs={10}>
                                    <Field
                                        name="slices_of_bread"
                                        component={TextField}
                                        type="number"
                                        validate={composeValidators(minValue(2))}
                                        label="Slices of bread"
                                    />
                                </Grid>
                            </Condition>
                            <Grid container 
                            justify="space-evenly"
                            alignItems="center"
                            style={{ padding: 16 }}>
                                <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                                    Submit
                                </Button>
                                <Button variant="contained" color="secondary" type="button" onClick={form.reset} disabled={submitting}>
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            )}
        </Form>
    </Container >

)

export default DishForm;