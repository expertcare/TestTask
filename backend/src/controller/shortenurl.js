const { StatusCodes } = require("http-status-codes");
const shortid = require("shortid");
const shortenurll = require('../models/url');

const shortenUrl = async (req, res) => {
    const { url } = req.body;
    try {
        const urlId = shortid.generate();

        const newShortenUrl = new shortenurll({
            originalUrl: url,
            shortUrlId: urlId
        });
        await newShortenUrl.save();

        const shortenedUrl = `http://localhost:5000/${urlId}`;

        res.status(StatusCodes.CREATED).json({
            message: "URL shortened successfully.",
            shortenedUrl: shortenedUrl,
            shortUrlId: urlId,
            success: true
        });

    } catch (error) {
        console.error("Error in shortening URL:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Server error",
            success: false
        });
    }
}

const openShortenUrl = async (req, res) => {
    const { urlId } = req.params;
    try {
        const shortUrl = await shortenurll.findOne({ shortUrlId: urlId });

        if (shortUrl) {
            return res.redirect(302, shortUrl.originalUrl);
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Shortened URL not found",
                success: false
            });
        }
    } catch (error) {
        console.error("Error in redirecting:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Server error",
            success: false
        });
    }
}


module.exports = {
    shortenUrl,
    openShortenUrl
}