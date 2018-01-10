# Bitmoji API
This repository is my attempt at deciphering Bitmoji's private API. This allows you to manipulate combinations for the Bitmoji avatars, and to render any one that you would want in high resolution.

Every Bitmoji image consists of multiple pieces of data that need to be provided in order to correctly render on the server. Bitmoji's API requires that a unique user id, comic style, and art style be provided. Images are all queried through URL parameters.

This repository focuses on the 'Bitmoji' style of avatars, but most techniques described can be directly applied to the 'Bitstrip' style of avatars as well.

---

## How to generate a custom Bitmoji?

In order to create a Bitmoji, you must provide a unique user-id. You can either use your own, or use someone else's since you are directly overriding the values associated with it. Look at the following example image URL:

```
https://render.bitstrips.com//render/6d228887-e76d-4678-a578-a47592240081/316830037_16_s4-v1.png?colours={"4f453e":8203556,"36a7e9":5793385,"6f4b4b":9663272}&pd2={"cranium":"cranium_bm27","forehead":"forehead_bm1","hair_back":"hair_back_blank","hair_front":"hair_front_bm27","hairbottom":"hairbottom_blank","brow_L":"brow_bm5","brow_R":"brow_bm5","nose":"nose_bm13","mouth":"mouth_bm4","tongue":"tongue_bm1_1","beard":"beard_bm3_1","stachin":"_blank","stachout":"stachout_bm6_5","detail_E_L":"detail_E_bm6","detail_E_R":"detail_E_bm6","detail_L":"detail_L_bm11","detail_R":"detail_L_bm11","detail_T":"detail_T_bm10","glasses":"glasses_bm8d","hat":"hat_bmbackwards"}&body={"body_type":0}&cropped="body"&outfit=889176&scale=3&style=4
```

This extremely large URL is composed of many small pieces of styling. Below will detail the basics of styling, and where you can find more information on styling your Bitmoji.
- `https://render.bitstrips.com//render/` is what lets the server know that you are rendering a custom avatar, not a Bitstrip comic. Comics are unable to be styled for some unknown reason.
- `6d228887-e76d-4678-a578-a47592240081` is the unique comic ID. There are thousands of comics available in the [comics.json](comics.json) file. This ID is what determines what pose the Bitmoji will be in when rendered. Although all background clipart associated with the comic will not show, this still allows for thousands of possible poses.
- `316830037_16_s4-v1` is the unique used ID. Every registered Bitmoji user has one. This is different for a user's Bitmoji and Bitstrip avatars. The `_s4` signifies that its the Bitmoji version.
- `colours={"4f453e":8203556,"36a7e9":5793385,"6f4b4b":9663272}` is responsible for changing the colors of different parts of the Bitmoji. Every color contained in the object has a key and value. The key is what determines what is being colored, and the value is the color itself. Bitmoji's color values are in decimal (base 10), so don't use hexadecimal or the server will throw an error.
- `pd2={"cranium":"cranium_bm27","forehead":"forehead_bm1","hair_back":"hair_back_blank","hair_front":"hair_front_bm27","hairbottom":"hairbottom_blank","brow_L":"brow_bm5","brow_R":"brow_bm5","nose":"nose_bm13","mouth":"mouth_bm4","tongue":"tongue_bm1_1","beard":"beard_bm3_1","stachin":"_blank","stachout":"stachout_bm6_5","detail_E_L":"detail_E_bm6","detail_E_R":"detail_E_bm6","detail_L":"detail_L_bm11","detail_R":"detail_L_bm11","detail_T":"detail_T_bm10","glasses":"glasses_bm8d","hat":"hat_bmbackwards"}` is what determines each and every unique property. Just like the colors, every item has a key and value pair. All possible options are outlined in the [bitmoji.json](bitmoji.json) file. Use this as a guide on sending a custom query.
- `body={"body_type":0}` is what sets the physical size of the Bitmoji (such as weight, and breast size on female avatars). These values are also listed in the JSON file.
- `cropped="body"` sets the avatar to crop all extra space to the body. The edges of the images will be as tight around the avatar as possible. The only other possible options are `head` or empty.
- `outfit=889176` sets the outfit.
- `scale=3` changes the resolution of the rendered avatar. Higher values are better resolutions.
- `style=4` This does not directly affect anything, but is associated with the style of the Bitmoji. Just like `_s4` in the unique ID.

Not all of these values need to be used or provided. Simply add any parameter that you desire. Finally, the above URL provided as an example would render the following image:
<p align="center">
<img src="https://render.bitstrips.com//render/6d228887-e76d-4678-a578-a47592240081/316830037_16_s4-v1.png?colours=%7B%224f453e%22:8203556,%2236a7e9%22:5793385,%226f4b4b%22:9663272%7D&pd2=%7B%22cranium%22:%22cranium_bm27%22,%22forehead%22:%22forehead_bm1%22,%22hair_back%22:%22hair_back_blank%22,%22hair_front%22:%22hair_front_bm27%22,%22hairbottom%22:%22hairbottom_blank%22,%22brow_L%22:%22brow_bm5%22,%22brow_R%22:%22brow_bm5%22,%22nose%22:%22nose_bm13%22,%22mouth%22:%22mouth_bm4%22,%22tongue%22:%22tongue_bm1_1%22,%22beard%22:%22beard_bm3_1%22,%22stachin%22:%22_blank%22,%22stachout%22:%22stachout_bm6_5%22,%22detail_E_L%22:%22detail_E_bm6%22,%22detail_E_R%22:%22detail_E_bm6%22,%22detail_L%22:%22detail_L_bm11%22,%22detail_R%22:%22detail_L_bm11%22,%22detail_T%22:%22detail_T_bm10%22,%22glasses%22:%22glasses_bm8d%22,%22hat%22:%22hat_bmbackwards%22%7D&body=%7B%22body_type%22:0%7D&cropped=%22body%22&outfit=889176&scale=3&style=4"/>
</p>
