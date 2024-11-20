<div align="center">
  <img src="app/assets/logo.png" height="350px" />
</div>

# Pandora BCI

Pandora BCI is a project built around EEG data, we built a deep learning model to predict patietns' movements based on their EEG signals. Our dataset is [WAY-EEG-GAL](https://www.nature.com/articles/sdata201447), the model is then deployed to a Flask web server. A desktop application was built to visualize the EEG signals of patients (Specific channels), and a mobile application was built to visualize the model itself and use it to predict a series of movements based on the input EEG signals file. We have built an artificial arm with ESP8266 to be controlled by the predictions of the patients, and it can also be controlled by the mobile application.

## Technologies Used

- Electron.js and React (Desktop Application)
- React Native (Mobile Application)
- Flask (Web Server & Deployment)
- PyTorch (Deep Learning Model)
- ESP8266 (Artifcial Arm Microcontroller)

## Installation

To install and run Pandora BCI locally, follow these steps:

1. Clone the project repository.
2. Navigate to the server directory.

```
cd server
```

3. Install the necessary dependencies by running the following command:

```
pip install -r requirements.txt
```

4. Run the server by running the following command

```
python app.py
```

5. Go back to client directiory.

```
cd ../client
```

6. Install the necessary dependencies by running the following command:

```
npm install
```

7. Run the desktop app by executing the following command:

```
npm run dev
```

8. Go back to app directiory.

```
cd ../app
```

9. Install the necessary dependencies by running the following command:

```
npm install
```

10. Run the mobile app by executing the following command:

```
npx expo start
```

11. Have fun using Pandora BCI! You can use test_data.csv file to try it out.

## Contributors

We would like to acknowledge the following individuals for their contributions to the Pandora BCI project:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Bodykudo" target="_black">
        <img
          src="https://avatars.githubusercontent.com/u/17731926?v=4"
          width="150px;"
          alt="Abdallah Magdy"
        />
        <br />
        <sub><b>Abdallah Magdy</b></sub></a
      >
    </td>
    <td align="center">
      <a href="https://github.com/abduelrahmanemad" target="_black">
        <img
          src="https://avatars.githubusercontent.com/u/104274128?v=4"
          width="150px;"
          alt="Abdulrahman Emad"
        />
        <br />
        <sub><b>Abdulrahman Emad</b></sub></a
      >
    </td>
    <td align="center">
      <a href="https://github.com/amg-eng" target="_black">
        <img
          src="https://avatars.githubusercontent.com/u/101107538?v=4"
          width="150px;"
          alt="Amgad Atef"
        />
        <br />
        <sub><b>Amgad Atef</b></sub></a
      >
    </td>
    <td align="center">
      <a href="https://github.com/MohamedAlaaAli" target="_black">
        <img
          src="https://avatars.githubusercontent.com/u/94873742?v=4"
          width="150px;"
          alt="Mohamed Alaa"
        />
        <br />
        <sub><b>Mohamed Alaa</b></sub></a
      >
    </td>
    <td align="center">
      <a href="https://github.com/Mahmoudm007" target="_black">
        <img
          src="https://avatars.githubusercontent.com/u/101353088?v=4"
          width="150px;"
          alt="Mahmoud Mohamed"
        />
        <br />
        <sub><b>Mahmoud Mohamed</b></sub></a
      >
    </td>
    <td align="center">
      <a href="https://github.com/ziyad-hf" target="_black">
        <img
          src="https://avatars.githubusercontent.com/u/99608059?v=4"
          width="150px;"
          alt="Ziyad ElFayoumy"
        />
        <br />
        <sub><b>Ziyad ElFayoumy</b></sub></a
      >
    </td>
  </tr>
</table>
