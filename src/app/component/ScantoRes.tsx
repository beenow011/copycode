'use client';
import { Button } from '@/components/ui/button';
import { Ellipsis, Loader2, LoaderPinwheel } from 'lucide-react';
import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import Tesseract, { createWorker } from 'tesseract.js';
import OutputRes from './OutputRes';

function ScantoRes() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [recognizedText, setRecognizedText] = useState('');
    const [textLoad, setTextLoad] = useState(false);
    const [res, setRes] = useState('');
    const [res2, setRes2] = useState('');
    const [isCameraOn, setIsCameraOn] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [load1, setLoad1] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [cropArea, setCropArea] = useState<Area | null>(null);
    const [cropAreaPixel, setCropAreaPixel] = useState<Area | null>(null);
    const [binaryImage, setBinaryImage] = useState('')

    const run = () => {
        setLoad1(true);
        setLoad2(true);
        fetch('/api/openAimcq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: recognizedText, model: 'gpt-4o-mini' }),
        })
            .then(res => res.json())
            .then(data => {
                setRes2(data.result);
                console.log(data.result);
                setLoad1(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setLoad1(false);
            });

        fetch('/api/question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: recognizedText }),
        })
            .then(res => res.json())
            .then(data => {
                setRes(data.result);
                console.log(data.result);
                setLoad2(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setLoad2(false);
            });
    };

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const image = event?.target?.files?.[0];
        if (image) {
            setSelectedImage(URL.createObjectURL(image));
        }
    };


    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        console.log(croppedArea, croppedAreaPixels, "done");
        setCropArea(croppedArea);
        setCropAreaPixel(croppedAreaPixels);
    };




    const binarizeImage = (base64Image: string, callback: (binarizedBase64: string | null) => void) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const image = new Image();
        image.src = base64Image;

        image.onload = () => {
            if (canvas && ctx) {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0, image.width, image.height);

                const imageData = ctx.getImageData(0, 0, image.width, image.height);
                const data = imageData.data;
                const threshold = 128; // You can adjust the threshold value

                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    const value = avg >= threshold ? 255 : 0;
                    data[i] = value;
                    data[i + 1] = value;
                    data[i + 2] = value;
                }

                ctx.putImageData(imageData, 0, 0);
                const binarizedBase64 = canvas.toDataURL();
                setBinaryImage(binarizedBase64)
                callback(binarizedBase64);
            }
        };

        image.onerror = (err) => {
            console.error('Error loading image:', err);
            callback(null);
        };
    };

    const recognizeText = () => {
        console.log(2);
        if (selectedImage && cropAreaPixel) {
            setTextLoad(true);
            const image = new Image();
            image.src = selectedImage;

            image.onload = () => {
                const canvas = document.createElement('canvas');
                const scaleX = image.naturalWidth / image.width;
                const scaleY = image.naturalHeight / image.height;
                canvas.width = cropAreaPixel.width;
                canvas.height = cropAreaPixel.height;
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    console.log(4);
                    ctx.drawImage(
                        image,
                        cropAreaPixel.x * scaleX,
                        cropAreaPixel.y * scaleY,
                        cropAreaPixel.width * scaleX,
                        cropAreaPixel.height * scaleY,
                        0,
                        0,
                        cropAreaPixel.width,
                        cropAreaPixel.height
                    );
                    console.log(5);

                    const base64Image = canvas.toDataURL('image/jpeg');
                    console.log(6);

                    setRecognizedText('');
                    console.log(7);

                    binarizeImage(base64Image, (binarizedBase64) => {
                        if (binarizedBase64) {
                            createWorker('eng')
                                .then(worker => {
                                    worker.setParameters({
                                        tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                                    });
                                    console.log(8);
                                    return worker.recognize(binarizedBase64)
                                        .then(result => {
                                            console.log(9);
                                            setRecognizedText(result.data.text);
                                            console.log('Recognized Text:', result.data.text);
                                            return worker.terminate();
                                        });
                                })
                                .catch(err => {
                                    console.error('Error recognizing text:', err);
                                })
                                .finally(() => {
                                    setTextLoad(false);
                                });
                        } else {
                            setTextLoad(false);
                        }
                    });
                }
            };

            image.onerror = (err) => {
                setTextLoad(false);
                console.error('Error loading image:', err);
            };
        } else {
            setTextLoad(false);
        }
    };


    return (
        <div className=' min-h-screen'>
            <div className='text-purple-800 px-6 md:px-12 py-8 flex flex-col items-center space-y-6'>
                <p className='text-2xl md:text-4xl font-bold mb-4 text-center text-purple-700'>
                    Scan the image and get your answers
                </p>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className='bg-gray-200 text-gray-800 p-3 rounded-lg shadow-md transition-transform duration-300 hover:scale-105'
                />

                {selectedImage && (
                    <div className='mt-6 space-y-4'>
                        <div className='relative w-full md:w-[600px] h-[400px] rounded-lg border-2 border-purple-300 shadow-md'>
                            <Cropper
                                image={selectedImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={4 / 3}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}

                            />
                        </div>
                        <Button
                            className='mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700'
                            onClick={recognizeText}
                        >
                            Scan Text
                        </Button>
                    </div>
                )}

                <div className='w-full md:w-[600px] space-y-4'>
                    <h2 className='text-xl font-semibold text-purple-700'>Recognized Text:</h2>

                    {textLoad ? (
                        <div className='flex justify-center items-center'>
                            <Loader2 className='h-8 w-8 animate-spin text-purple-600' />
                        </div>
                    ) : (binaryImage.length > 0 && recognizedText.length > 0) && (
                        <div className='flex flex-col items-center space-y-4'>
                            <img src={binaryImage} alt="Binarized" className='w-72 h-auto rounded-lg shadow-md border border-purple-300' />
                            <p className='w-full md:w-96 bg-gray-100 p-4 rounded-lg shadow-md border-2 border-purple-400 text-center text-gray-800'>
                                {recognizedText}
                            </p>
                        </div>
                    )}

                    <Button
                        onClick={run}
                        className='mt-6 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700'
                        disabled={recognizedText.length === 0}
                    >
                        Search
                    </Button>
                </div>

                <OutputRes load1={load1} load2={load2} res={res} res2={res2} model='gpt-4o-mini' />
            </div>
        </div>
    );

}

export default ScantoRes;
