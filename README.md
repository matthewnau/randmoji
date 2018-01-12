# Randmoji
This repository is my attempt at deciphering Bitmoji's private API. This allows you to manipulate combinations for the Bitmoji avatars, and to render any one that you would want in high resolution. In the process of reverse engineering Bitmoji, I designed this random generator in order to test that my understanding of the API was correct. This turned into a fun little project in itself, since the random generator comes up with the wackiest combinations!

Randmoji can generate male and female Bitmoji avatars. No two avatars are similar. Every single one consists of multiple different combinations.

---

## Understanding the Bitmoji API

In order to create a Bitmoji, you must provide a unique user-id. You can either use your own, or use someone else's since you are directly overriding the values associated with it. Look at the following example image URL:

```
https://render.bitstrips.com//render/10221787/316830037_16_s4-v1.png?pd2={%22cranium%22:%22cranium_bm35%22,%22forehead%22:%22forehead_bm1%22,%22hair_back%22:%22hair_back_blank%22,%22hair_front%22:%22hair_front_bm35%22,%22hairbottom%22:%22hairbottom_blank%22,%22beard%22:%22beard_bm4_1%22,%22stachin%22:%22stachin_bm1_1%22,%22stachout%22:%22stachout_bm1_1%22,%22mouth%22:%22mouth_bm3%22,%22tongue%22:%22tongue_bm1_1%22,%22brow_L%22:%22brow_bm3%22,%22brow_R%22:%22brow_bm3%22,%22detail_T%22:%22detail_T_bm14%22,%22detail_L%22:%22_blank%22,%22detail_R%22:%22_blank%22,%22detail_E_L%22:%22detail_E_bm7%22,%22detail_E_R%22:%22detail_E_bm7%22,%22nose%22:%22nose_bm15%22,%22hat%22:%22hat_bmfloppy%22,%22glasses%22:%22glasses_bm3d%22}&colours={%22ff9866%22:9476876,%22ffcc99%22:5988934,%224f453e%22:12795028,%22926715%22:2073019,%2236a7e9%22:921868,%226f4b4b%22:8626436}&body={%22body_type%22:1}&sex=1&outfit=889221&proportion=3&cropped=%22body%22&scale=2&style=4
```

This extremely large URL is composed of many small pieces of styling. Below will detail the basics of styling, and where you can find more information on styling your Bitmoji.
- `https://render.bitstrips.com//render/` is what lets the server know that you are rendering a custom avatar, not a Bitstrip comic. Comics are unable to be styled for some unknown reason.
- `10221787` is the unique comic ID. There are thousands of comics available in the [comics.json](comics.json) file. This ID is what determines what pose the Bitmoji will be in when rendered. Although all background clipart associated with the comic will not show, this still allows for thousands of possible poses.
- `316830037_16_s4-v1` is the unique user ID. Every registered Bitmoji user has one. This is different for a user's Bitmoji and Bitstrip avatars. The `_s4` signifies that its the Bitmoji version.
- `colours={%22ff9866%22:9476876,%22ffcc99%22:5988934,%224f453e%22:12795028,%22926715%22:2073019,%2236a7e9%22:921868,%226f4b4b%22:8626436}` is responsible for changing the colors of different parts of the Bitmoji. Every color contained in the object has a key and value. The key is what determines what is being colored, and the value is the color itself. Bitmoji's color values are in decimal (base 10), so don't use hexadecimal or the server will throw an error.
- `pd2={%22cranium%22:%22cranium_bm35%22,%22forehead%22:%22forehead_bm1%22,%22hair_back%22:%22hair_back_blank%22,%22hair_front%22:%22hair_front_bm35%22,%22hairbottom%22:%22hairbottom_blank%22,%22beard%22:%22beard_bm4_1%22,%22stachin%22:%22stachin_bm1_1%22,%22stachout%22:%22stachout_bm1_1%22,%22mouth%22:%22mouth_bm3%22,%22tongue%22:%22tongue_bm1_1%22,%22brow_L%22:%22brow_bm3%22,%22brow_R%22:%22brow_bm3%22,%22detail_T%22:%22detail_T_bm14%22,%22detail_L%22:%22_blank%22,%22detail_R%22:%22_blank%22,%22detail_E_L%22:%22detail_E_bm7%22,%22detail_E_R%22:%22detail_E_bm7%22,%22nose%22:%22nose_bm15%22,%22hat%22:%22hat_bmfloppy%22,%22glasses%22:%22glasses_bm3d%22}` is what determines each and every unique property. Just like the colors, every item has a key and value pair. All possible options are outlined in the [bitmoji.json](bitmoji.json) file. Use this as a guide on sending a custom query.
- `body={"body_type":1}` is what sets the physical size of the Bitmoji (such as weight, and breast size on female avatars). These values are also listed in the JSON file.
- `cropped="body"` sets the avatar to crop all extra space to the body. The edges of the images will be as tight around the avatar as possible. The only other possible options are `head` or empty.
- `outfit=889221` sets the outfit.
- `scale=2` changes the resolution of the rendered avatar. Higher values are better resolutions.
- `style=4` This does not directly affect anything, but is associated with the style of the Bitmoji. Just like `_s4` in the unique ID.
- `sex=1` signifies the Bitmoji's sex. `1` is for male, `2` is for female.
- `proportion=3` determines the face/head shape.
- There are other options that dtermine what the image will look like such as `head_rotation=` and `body_rotation=`. These parameters take a numeric value and cause the image to rotate that specific part of the avatar.

Not all of these values need to be used or provided. Simply add any parameter that you desire. Finally, the above URL provided as an example would render the following image:
<p align="center">
<img src="https://render.bitstrips.com//render/10221787/316830037_16_s4-v1.png?pd2={%22cranium%22:%22cranium_bm35%22,%22forehead%22:%22forehead_bm1%22,%22hair_back%22:%22hair_back_blank%22,%22hair_front%22:%22hair_front_bm35%22,%22hairbottom%22:%22hairbottom_blank%22,%22beard%22:%22beard_bm4_1%22,%22stachin%22:%22stachin_bm1_1%22,%22stachout%22:%22stachout_bm1_1%22,%22mouth%22:%22mouth_bm3%22,%22tongue%22:%22tongue_bm1_1%22,%22brow_L%22:%22brow_bm3%22,%22brow_R%22:%22brow_bm3%22,%22detail_T%22:%22detail_T_bm14%22,%22detail_L%22:%22_blank%22,%22detail_R%22:%22_blank%22,%22detail_E_L%22:%22detail_E_bm7%22,%22detail_E_R%22:%22detail_E_bm7%22,%22nose%22:%22nose_bm15%22,%22hat%22:%22hat_bmfloppy%22,%22glasses%22:%22glasses_bm3d%22}&colours={%22ff9866%22:9476876,%22ffcc99%22:5988934,%224f453e%22:12795028,%22926715%22:2073019,%2236a7e9%22:921868,%226f4b4b%22:8626436}&body={%22body_type%22:1}&sex=1&outfit=889221&proportion=3&cropped=%22body%22&scale=2&style=4"/>
</p>
